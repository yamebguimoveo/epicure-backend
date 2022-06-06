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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthHandler {
    verify(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const decoded = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "SECRET");
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
        });
    }
}
exports.AuthHandler = AuthHandler;
//# sourceMappingURL=auth.handler.js.map