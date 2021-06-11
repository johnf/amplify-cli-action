import { AppSyncVTLTemplate } from '../type-definition';
import { AmplifyAppSyncSimulator } from '..';
import { AppSyncGraphQLExecutionContext } from '../utils/graphql-runner';
import { GraphQLResolveInfo } from 'graphql';
export declare type AppSyncSimulatorRequestContext = {
    jwt?: {
        iss?: string;
        sub?: string;
        'cognito:username'?: string;
    };
    request?: object;
};
export declare type AppSyncVTLRenderContext = {
    arguments: object;
    source: object;
    stash?: object;
    result?: any;
    prevResult?: any;
    error?: any;
};
export declare class VelocityTemplate {
    private simulatorContext;
    private compiler;
    private template;
    constructor(template: AppSyncVTLTemplate, simulatorContext: AmplifyAppSyncSimulator);
    render(ctxValues: AppSyncVTLRenderContext, requestContext: AppSyncGraphQLExecutionContext, info?: GraphQLResolveInfo): {
        result: any;
        stash: any;
        errors: any;
        isReturn: boolean;
        hadException: boolean;
    };
    private buildRenderContext;
}
