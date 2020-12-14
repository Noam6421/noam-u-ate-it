"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserMutation = void 0;
var graphql_request_1 = require("graphql-request");
exports.createUserMutation = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation createUser(\n        $email: String!\n        $name: String!\n        $lastName: String!\n        $birthDate: Date!\n        $idNum: String!\n        $phone: String!\n        $beer: String\n    ) {\n        createUser(\n        input: {\n            user: {\n            name: $name\n            lastName: $lastName\n            birthDate: $birthDate\n            idNum: $idNum\n            phone: $phone\n            email: $email\n            beer: $beer\n            }\n        }\n        ) {\n        clientMutationId\n        user{\n            id\n        }\n        }\n    }  \n"], ["\n    mutation createUser(\n        $email: String!\n        $name: String!\n        $lastName: String!\n        $birthDate: Date!\n        $idNum: String!\n        $phone: String!\n        $beer: String\n    ) {\n        createUser(\n        input: {\n            user: {\n            name: $name\n            lastName: $lastName\n            birthDate: $birthDate\n            idNum: $idNum\n            phone: $phone\n            email: $email\n            beer: $beer\n            }\n        }\n        ) {\n        clientMutationId\n        user{\n            id\n        }\n        }\n    }  \n"])));
var templateObject_1;
//# sourceMappingURL=createUserMutation.js.map