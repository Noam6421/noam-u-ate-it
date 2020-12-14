"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFoodPrefMutation = void 0;
var graphql_request_1 = require("graphql-request");
exports.createFoodPrefMutation = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation createFoodPref($userId: Int!, $foodId: Int!) {\n    createFoodPreference(input: {foodPreference: {foodId: $foodId, userId: $userId}}) {\n        clientMutationId\n        foodPreference {\n        foodId\n        userId\n        }\n    }\n    } \n"], ["\n    mutation createFoodPref($userId: Int!, $foodId: Int!) {\n    createFoodPreference(input: {foodPreference: {foodId: $foodId, userId: $userId}}) {\n        clientMutationId\n        foodPreference {\n        foodId\n        userId\n        }\n    }\n    } \n"])));
var templateObject_1;
//# sourceMappingURL=createFoodPrefMutation.js.map