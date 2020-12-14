"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodPrefMutation = void 0;
var graphql_request_1 = require("graphql-request");
exports.deleteFoodPrefMutation = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation deleteFoodPref($userId: Int!, $foodId: Int!) {\n    deleteFoodPreferenceByUserIdAndFoodId(\n        input: { userId: $userId, foodId: $foodId }\n    ) {\n        foodPreference {\n        foodId\n        userId\n        }\n    }\n    }\n"], ["\n    mutation deleteFoodPref($userId: Int!, $foodId: Int!) {\n    deleteFoodPreferenceByUserIdAndFoodId(\n        input: { userId: $userId, foodId: $foodId }\n    ) {\n        foodPreference {\n        foodId\n        userId\n        }\n    }\n    }\n"])));
var templateObject_1;
//# sourceMappingURL=deleteFoodPrefMutation.js.map