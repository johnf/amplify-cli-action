import * as v1Types from './compose-spec/v1';
import * as v2Types from './compose-spec/v2';
import { BuildHashMap } from './ecs-objects/types';
export declare const dockerComposeToObject: (yamlFileContents: string) => v2Types.ConfigSchemaV24Json | v1Types.ConfigSchemaV1Json;
export declare const dockerfileToObject: (dockerfileContents: string) => v2Types.ConfigSchemaV24Json | v1Types.ConfigSchemaV1Json;
export declare const generateBuildSpec: (containerMap: BuildHashMap) => string;
//# sourceMappingURL=DockerUtils.d.ts.map