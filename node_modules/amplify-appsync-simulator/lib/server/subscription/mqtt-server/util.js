"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = void 0;
function defer(done) {
    if (typeof done === 'function') {
        setImmediate(done);
    }
}
exports.defer = defer;
//# sourceMappingURL=util.js.map