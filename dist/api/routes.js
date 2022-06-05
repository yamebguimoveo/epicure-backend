"use strict";
exports.__esModule = true;
var express_1 = require("express");
var v1_routes_1 = require("./v1/v1.routes");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.public = (0, express_1.Router)();
        console.log("Into Api routes");
        this.initializeRoutes();
    }
    ApiRoutes.prototype.initializeRoutes = function () {
        var v1Routes = new v1_routes_1["default"]();
        this.public.use("/v1", v1Routes.router);
    };
    return ApiRoutes;
}());
exports["default"] = ApiRoutes;
