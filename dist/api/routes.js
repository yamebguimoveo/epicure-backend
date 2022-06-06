"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_routes_1 = __importDefault(require("./v1/v1.routes"));
class ApiRoutes {
    constructor() {
        this.public = (0, express_1.Router)();
        console.log("Into Api routes");
        this.initializeRoutes();
    }
    initializeRoutes() {
        const v1Routes = new v1_routes_1.default();
        this.public.use("/v1", v1Routes.router);
    }
}
exports.default = ApiRoutes;
//# sourceMappingURL=routes.js.map