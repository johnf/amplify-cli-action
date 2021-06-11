"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectResolversWithAuthRules = exports.AwsAuth = exports.AwsSubscribe = void 0;
var aws_subscribe_1 = require("./aws-subscribe");
Object.defineProperty(exports, "AwsSubscribe", { enumerable: true, get: function () { return aws_subscribe_1.AwsSubscribe; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "AwsAuth", { enumerable: true, get: function () { return auth_1.AwsAuth; } });
Object.defineProperty(exports, "protectResolversWithAuthRules", { enumerable: true, get: function () { return auth_1.protectResolversWithAuthRules; } });
//# sourceMappingURL=index.js.map