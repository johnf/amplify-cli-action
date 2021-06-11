"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUtils = void 0;
var lodash_1 = require("lodash");
exports.listUtils = {
    copyAndRetainAll: function (list, intersect) {
        return list.filter(function (value) { return intersect.indexOf(value) !== -1; });
    },
    copyAndRemoveAll: function (list, toRemove) {
        return list.filter(function (value) { return toRemove.indexOf(value) === -1; });
    },
    sortList: function (list, desc, property) {
        if (list.length === 0 || list.length > 1000) {
            return list;
        }
        var type = typeof list[0];
        var isMixedTypes = lodash_1.some(list.slice(1), function (i) { return typeof i !== type; });
        if (isMixedTypes) {
            return list;
        }
        var isScalarList = lodash_1.some(list, lodash_1.negate(lodash_1.isObject));
        return lodash_1.orderBy(list, isScalarList ? lodash_1.identity : property, desc ? 'desc' : 'asc');
    },
};
//# sourceMappingURL=list-utils.js.map