"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = void 0;
exports.str = {
    toUpper: function (str) {
        return str.toUpperCase();
    },
    toLower: function (str) {
        return str.toLowerCase();
    },
    toReplace: function (str, substr, newSubstr) {
        return str.replace(new RegExp(substr, 'g'), newSubstr);
    },
    normalize: function (str, form) {
        return str.normalize(form.toUpperCase());
    },
};
//# sourceMappingURL=str.js.map