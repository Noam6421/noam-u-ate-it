"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var postgraphile_1 = require("postgraphile");
var getUser_1 = __importDefault(require("./db/functions/getUser"));
var getFood_1 = __importDefault(require("./db/functions/getFood"));
var createUser_1 = __importDefault(require("./db/functions/createUser"));
var updateUser_1 = __importDefault(require("./db/functions/updateUser"));
var createFood_1 = __importDefault(require("./db/functions/createFood"));
var getFoodPref_1 = __importDefault(require("./db/functions/getFoodPref"));
var createFoodPref_1 = __importDefault(require("./db/functions/createFoodPref"));
var updateFoodPref_1 = __importDefault(require("./db/functions/updateFoodPref"));
require('dotenv').config();
var app = express_1.default();
var publicPath = path_1.default.join(__dirname, 'client', 'public');
var port = process.env.PORT || 3001;
app.use(postgraphile_1.postgraphile(process.env.DATABASE_URL, 'u-ate-it-schema', {
    graphiql: true,
    enhanceGraphiql: true,
}));
app.use(express_1.default.static(publicPath));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// User paths from client to DB
app.get('/user', getUser_1.default);
app.post('/user', createUser_1.default);
app.put('/user', updateUser_1.default);
// Food paths from client to DB
app.get('/food', getFood_1.default);
app.post('/food', createFood_1.default);
// FoodPref paths from client to DB
app.get('/foodPref', getFoodPref_1.default);
app.post('/foodPref', createFoodPref_1.default);
app.put('/foodPref', updateFoodPref_1.default);
app.listen(port, function () {
    console.log("Server is up on port " + port + "!");
});
//# sourceMappingURL=server.js.map