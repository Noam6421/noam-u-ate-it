"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFoodMutation = void 0;
var graphql_request_1 = require("graphql-request");
exports.createFoodMutation = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation createFood ($foodName: String!) {\n        createFood(\n            input: { \n                food: { \n                    foodName: $foodName \n                } \n            }\n        ) {\n            food {\n                foodName\n                id\n            }\n        }\n    }\n"], ["\n    mutation createFood ($foodName: String!) {\n        createFood(\n            input: { \n                food: { \n                    foodName: $foodName \n                } \n            }\n        ) {\n            food {\n                foodName\n                id\n            }\n        }\n    }\n"])));
var templateObject_1;
//# sourceMappingURL=createFoodMutation.js.map