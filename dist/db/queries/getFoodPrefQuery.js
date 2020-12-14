"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodPrefQuery = void 0;
var graphql_request_1 = require("graphql-request");
exports.getFoodPrefQuery = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query getFoodPref ($userId: Int!) {\n    allFoodPreferences(condition: {userId: $userId}) {\n        nodes {\n            foodByFoodId {\n                foodName\n                id\n            }\n        }\n    }\n    }\n"], ["\n    query getFoodPref ($userId: Int!) {\n    allFoodPreferences(condition: {userId: $userId}) {\n        nodes {\n            foodByFoodId {\n                foodName\n                id\n            }\n        }\n    }\n    }\n"])));
var templateObject_1;
//# sourceMappingURL=getFoodPrefQuery.js.map