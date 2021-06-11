"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor(build, name, portMappings, command, entrypoint, env_file, environment, image, healthcheck, working_dir, user, secrets) {
        this.defaultLogConfiguration = {
            logDriver: 'awslogs',
            options: {
                'awslogs-stream-prefix': 'ecs',
            },
        };
        this.logConfiguration = this.defaultLogConfiguration;
        this.build = build;
        this.name = name;
        this.portMappings = portMappings;
        this.command = [].concat(command);
        this.entrypoint = [].concat(entrypoint);
        this.env_file = [].concat(env_file);
        this.environment = Array.isArray(environment)
            ? environment.reduce((acc, element) => {
                const [key, value] = element.split('=');
                acc[key] = value;
                return acc;
            }, {})
            : environment;
        this.image = image;
        this.healthcheck = (({ interval, command, start_period, timeout, retries }) => command
            ? {
                interval: toSeconds(interval),
                command: [].concat(command),
                start_period: toSeconds(start_period),
                timeout: toSeconds(timeout),
                retries,
            }
            : undefined)(healthcheck);
        this.working_dir = working_dir;
        this.user = user;
        this.secrets = secrets !== null && secrets !== void 0 ? secrets : new Set();
    }
}
function toSeconds(str) {
    const [, seconds] = `${str}`.match(/^(\d+)s\s*$/) || [];
    if (seconds === undefined) {
        return undefined;
    }
    return parseInt(seconds, 10);
}
exports.default = Container;
//# sourceMappingURL=container.js.map