"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_request_1 = require("graphql-request");
var getFoodPrefQuery_1 = require("../queries/getFoodPrefQuery");
var deleteFoodPrefMutation_1 = require("../mutations/deleteFoodPrefMutation");
var createFoodPrefMutation_1 = require("../mutations/createFoodPrefMutation");
;
var updateFoodPref = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prevFoodPrefData, prevFoodPref_1, foodPref, newPrevFoodPref_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, graphql_request_1.request(String(process.env.GRAPHQL_URL), getFoodPrefQuery_1.getFoodPrefQuery, {
                        userId: req.body.userId
                    })];
            case 1:
                prevFoodPrefData = _a.sent();
                prevFoodPref_1 = [];
                prevFoodPrefData.allFoodPreferences.nodes.map(function (node) {
                    prevFoodPref_1.push({ name: node.foodByFoodId.foodName, id: node.foodByFoodId.id });
                });
                foodPref = req.body.foodPref;
                newPrevFoodPref_1 = prevFoodPref_1;
                // comparing between foodPrefList in db with foodPrefList the client send
                foodPref.forEach(function (food) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!prevFoodPref_1.some(function (prevFood) { return prevFood.name === food.name; })) return [3 /*break*/, 1];
                                newPrevFoodPref_1 = newPrevFoodPref_1.filter(function (prevFood) { return prevFood.name !== food.name; });
                                return [3 /*break*/, 3];
                            case 1:
                                if (!!(prevFoodPref_1.some(function (prevFood) { return prevFood.name === food.name; }))) return [3 /*break*/, 3];
                                return [4 /*yield*/, graphql_request_1.request(String(process.env.GRAPHQL_URL), createFoodPrefMutation_1.createFoodPrefMutation, {
                                        userId: req.body.userId,
                                        foodId: food.value
                                    })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                ;
                                return [2 /*return*/];
                        }
                    });
                }); });
                newPrevFoodPref_1.forEach(function (prevFood) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, graphql_request_1.request(String(process.env.GRAPHQL_URL), deleteFoodPrefMutation_1.deleteFoodPrefMutation, {
                                    userId: req.body.userId,
                                    foodId: prevFood.id
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.send('FoodPref updated');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).send(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = updateFoodPref;
//# sourceMappingURL=updateFoodPref.js.map