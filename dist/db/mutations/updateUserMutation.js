"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserMutation = void 0;
var graphql_request_1 = require("graphql-request");
exports.updateUserMutation = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation updateUser(\n        $email: String!\n        $name: String!\n        $lastName: String!\n        $birthDate: Date!\n        $idNum: String!\n        $phone: String!\n        $beer: String\n    ) {\n    updateUserByEmail(\n        input: {\n        email: $email\n        userPatch: {\n            beer: $beer\n            birthDate: $birthDate\n            idNum: $idNum\n            lastName: $lastName\n            name: $name\n            phone: $phone\n        }\n        }\n    ) {\n        user {\n        id\n        }\n    }\n    }\n"], ["\n    mutation updateUser(\n        $email: String!\n        $name: String!\n        $lastName: String!\n        $birthDate: Date!\n        $idNum: String!\n        $phone: String!\n        $beer: String\n    ) {\n    updateUserByEmail(\n        input: {\n        email: $email\n        userPatch: {\n            beer: $beer\n            birthDate: $birthDate\n            idNum: $idNum\n            lastName: $lastName\n            name: $name\n            phone: $phone\n        }\n        }\n    ) {\n        user {\n        id\n        }\n    }\n    }\n"])));
var templateObject_1;
//# sourceMappingURL=updateUserMutation.js.map