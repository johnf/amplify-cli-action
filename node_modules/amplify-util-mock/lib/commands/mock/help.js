"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'help';
const run = (context) => {
    const header = `amplify ${exports.name} [subcommand]\nDescription:\nMock resources locally`;
    const commands = [
        {
            name: 'storage',
            description: 'Run Storage Mock Endpoint',
        },
        {
            name: 'api',
            description: 'Run GraphQL API Mock Endpoint',
        },
        {
            name: 'function <name>',
            description: 'Invoke Function locally',
        },
    ];
    context.amplify.showHelp(header, commands);
    return;
};
exports.run = run;
//# sourceMappingURL=help.js.map