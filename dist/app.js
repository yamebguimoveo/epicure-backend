"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        // if (process.env.NODE_ENV === "production") {
        //   this.app.use(helmet());
        // }
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    initializeRoutes() {
        const apiRoutes = new routes_1.default();
        this.app.use("/api", apiRoutes.public);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("server listening on port " + this.port);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map