"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailQuery = void 0;
var graphql_request_1 = require("graphql-request");
exports.getUserByEmailQuery = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query getUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n        name\n        id\n        idNum\n        lastName\n        phone\n        email\n        birthDate\n        beer\n    }\n    }\n"], ["\n    query getUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n        name\n        id\n        idNum\n        lastName\n        phone\n        email\n        birthDate\n        beer\n    }\n    }\n"])));
var templateObject_1;
//# sourceMappingURL=getUserByEmailQuery.js.map