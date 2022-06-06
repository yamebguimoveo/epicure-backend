"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthHandler {
    async verify(authorization) {
        try {
            if (!authorization)
                throw "Token is missing";
            if (!authorization.startsWith("Bearer ")) {
                throw "Token is missing";
            }
            const token = authorization.split(" ")[1];
            if (!token) {
                throw "Token is missing";
            }
            const decoded = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "SECRET");
            if (typeof decoded !== "string") {
                const { email, name } = decoded;
                if (!!email && !!name) {
                    return { email, name };
                }
            }
            throw "Payload is wrong or invalid";
        }
        catch (err) {
            throw err;
        }
    }
}
exports.AuthHandler = AuthHandler;
//# sourceMappingURL=auth.handler.js.map