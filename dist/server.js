"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
require("./db/mongo-init");
var port = 3001;
var app = new app_1["default"](port);
app.listen();
