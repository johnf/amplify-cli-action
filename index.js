const core = require('@actions/core');
const execSync = require('child_process').execSync;
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  // const sourceDir = core.getInput('source_dir');
  const projectDir = core.getInput('project_dir');
  // const distributionDir = core.getInput('distribution_dir');
  // const buildCommand = core.getInput('build_command');
  const amplifyCommand = core.getInput('amplify_command');
  const amplifyEnv = core.getInput('amplify_env');
  const deleteLock = core.getInput('delete_lock');
  const amplifyCliVersion = core.getInput('amplify_cli_version');
  const amplifyArguments = core.getInput('amplify_arguments');


  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    core.setFailed('You must provide the action with both AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables in order to deploy');
    return;
  }

  if (!process.env.AWS_REGION) {
    core.setFailed('You must provide AWS_REGION environment variable in order to deploy');
    return;
  }

  if (!amplifyCommand) {
    core.setFailed('You must provide amplify_command input parameter in order to deploy');
    return;
  }

  if (!amplifyEnv) {
    core.setFailed('You must provide amplify_env input parameter in order to deploy');
    return;
  }

  // if amplify if available at path and custom amplify version is unspecified, do nothing,
  // otherwise install globally latest npm version
  // FIXME: weird: using local dep amplify-cli bugs with awscloudformation provider: with using provider underfined
  if(amplifyCliVersion) {
    execSync(`cd ${__dirname}; npm install @aws-amplify/cli@${amplifyCliVersion}`);
  }

  const cmd = `${__dirname}/node_modules/.bin/amplify`;

  // cd to project_dir if custom subfolder is specified
  if(projectDir) {
    process.chdir(projectDir);
  }

  const version = execSync(`${cmd} --version`);
  console.log(`amplify version ${version}`);

  let output, awsConfigFilePath, amplify, providers;
  switch (amplifyCommand) {
    case 'push':
      output = execSync(`${cmd} push ${amplifyArguments} --yes`);
      console.log(output);
      break;

    case 'publish':
      output = execSync(`${cmd} push ${amplifyArguments} --yes`);
      console.log(output);
      break;

    case 'status':
      output = execSync(`${cmd} status ${amplifyArguments}`);
      console.log(output);
      break;

    case 'configure':
      awsConfigFilePath = `${process.cwd()}/aws_config_file_path.json`;

      fs.writeFileSync(awsConfigFilePath, `{ "accessKeyId": "${process.env.AWS_ACCESS_KEY_ID}", "secretAccessKey": "${process.env.AWS_SECRET_ACCESS_KEY}", "region": "${process.env.AWS_REGION}" }`);
      fs.writeFileSync('./amplify/.config/local-aws-info.json', `{ "projectPath": "${process.cwd()}", "defaultEditor": "code", "envName": "${amplifyEnv}" }`);
      fs.writeFileSync('./amplify/.config/local-aws-info.json', `{ "${amplifyEnv}" : { "configLevel": "project", "useProfile": false, "awsConfigFilePath": "${awsConfigFilePath}" } }`);

      // if environment doesn't exist fail explicitly
      output = execSync(`${cmd} env get --name ${amplifyEnv}`);
      if (output.match(/No environment found/)) {
        core.setFailed(`${amplifyEnv} environment does not exist, consider using add_env command instead`);
        return;
      }

      console.log(`found existing environment ${amplifyEnv}`);
      output = execSync(`${cmd} env pull --yes ${amplifyArguments}`);
      console.log(output);


      output = execSync(`${cmd} status`);
      console.log(output);
      break;

    case 'add_env':
      amplify = `{ "envName": "${amplifyEnv}" }`;

      providers = `
        {
          "awscloudformation": {
            "configLevel": "project",
            "useProfile": false,
            "accessKeyId": "${process.env.AWS_ACCESS_KEY_ID}",
            "secretAccessKey": "${process.env.AWS_SECRET_ACCESS_KEY}",
            "region": "${process.env.AWS_REGION}"
          }
        }
      `;

      output = execSync(`${cmd} env add ${amplifyArguments} --amplify "${amplify}" --providers "${providers}" --yes`);
      console.log(output);

      output = execSync(`${cmd} status`);
      console.log(output);
      break;

    case 'delete_env':
      // ACCIDENTAL DELETION PROTECTION #0: delete_lock
      if (deleteLock === 'true') {
        core.setFailed('ACCIDENTAL DELETION PROTECTION: You must unset delete_lock input parameter for delete to work');
        return;
      }

      // ACCIDENTAL DELETION PROTECTION #1: environment to be deleted cannot contain prod/release/master in its name
      if (amplifyEnv.match(/prod|release|master/)) {
        core.setFailed('ACCIDENTAL DELETION PROTECTION: delete command is unsupported for environments that contain prod/release/master in its name');
        return;
      }

      // fill in dummy env in local-env-info so we delete current environment
      // without switch to another one (amplify restriction)
      fs.writeFileSync('./amplify/.config/local-env-info.json', `{ "projectPath": "${process.cwd()}", "defaultEditor": "code", "envName": "dummyenvfordeletecurrentowork" }`);
      output = execSync(`${cmd} env remove ${amplifyEnv} ${amplifyArguments}`, { input: 'Y' });
      console.log(output);
      break;

    default:
      core.setFailed(`amplify command ${amplifyCommand} is invalid or not supported`);
      return;
  }
} catch (error) {
  core.setFailed(error.message);
}
