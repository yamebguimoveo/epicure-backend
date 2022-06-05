"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var routes_1 = require("./api/routes");
var App = /** @class */ (function () {
    function App(port) {
        this.app = (0, express_1["default"])();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    App.prototype.initializeMiddlewares = function () {
        if (process.env.NODE_ENV === "production") {
            this.app.use((0, helmet_1["default"])());
        }
        this.app.use(express_1["default"].json());
        this.app.use((0, cors_1["default"])());
    };
    App.prototype.initializeRoutes = function () {
        var apiRoutes = new routes_1["default"]();
        this.app.use("/api", apiRoutes.public);
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("server listening on port " + _this.port);
        });
    };
    return App;
}());
exports["default"] = App;
