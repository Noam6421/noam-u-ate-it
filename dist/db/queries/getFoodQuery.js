"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodQuery = void 0;
var graphql_request_1 = require("graphql-request");
exports.getFoodQuery = graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query getFood {\n        allFoods(orderBy: FOOD_NAME_ASC) {\n        nodes {\n            foodName\n            id\n        }\n        }\n    }\n"], ["\n    query getFood {\n        allFoods(orderBy: FOOD_NAME_ASC) {\n        nodes {\n            foodName\n            id\n        }\n        }\n    }\n"])));
var templateObject_1;
//# sourceMappingURL=getFoodQuery.js.map