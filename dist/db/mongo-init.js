"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
    mongoose_1.default
        .connect(mongoURI)
        .then((con) => {
        console.log("db connect success");
    })
        .catch((err) => console.log(err));
}
//# sourceMappingURL=mongo-init.js.map