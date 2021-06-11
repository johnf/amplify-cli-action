"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubOwnerRepoFromPath = void 0;
function getGitHubOwnerRepoFromPath(path) {
    if (!path.startsWith('https://github.com/')) {
        throw Error(`Invalid Repo Path ${path}`);
    }
    const [, , , owner, repo, , branch, ...pathParts] = path.split('/');
    return {
        owner,
        repo,
        branch,
        path: pathParts.join('/'),
    };
}
exports.getGitHubOwnerRepoFromPath = getGitHubOwnerRepoFromPath;
//# sourceMappingURL=github.js.map