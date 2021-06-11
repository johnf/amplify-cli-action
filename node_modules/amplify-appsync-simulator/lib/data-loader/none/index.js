"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoneDataLoader = void 0;
var NoneDataLoader = /** @class */ (function () {
    function NoneDataLoader() {
    }
    NoneDataLoader.prototype.load = function (request) {
        return request.payload || null;
    };
    return NoneDataLoader;
}());
exports.NoneDataLoader = NoneDataLoader;
//# sourceMappingURL=index.js.map