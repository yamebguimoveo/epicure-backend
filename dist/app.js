"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./api/routes"));
const mongo_init_1 = __importDefault(require("./db/mongo-init"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.connectToDB();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    connectToDB() {
        mongoose_1.default
            .connect(mongo_init_1.default)
            .then((connect) => {
            console.log("connect to db");
        })
            .catch((err) => console.log("failed to connect to db"));
    }
    initializeMiddlewares() {
        if (process.env.NODE_ENV === "production") {
            this.app.use((0, helmet_1.default)());
        }
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