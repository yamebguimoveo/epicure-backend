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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const auth_handler_1 = require("../handlers/auth.handler");
const user_handler_1 = require("../handlers/user.handler");
class Authenticator {
    static protect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new auth_handler_1.AuthHandler();
                const userHandler = new user_handler_1.UserHandler();
                const { authorization } = req.headers;
                //jwt payload return from verify ({email,name})
                const { email } = yield handler.verify(authorization);
                const existUser = yield userHandler.checkIfUserExists(email);
                if (!existUser)
                    throw { message: "User does not exist anymore" };
                req.user = existUser;
                next();
            }
            catch (error) {
                res.status(403).json({
                    status: "fail",
                    error,
                });
            }
        });
    }
    static restrictToAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user.admin) {
                    throw "User is not admin";
                }
                next();
            }
            catch (error) {
                res.status(403).json({
                    status: "fail",
                    message: error,
                });
            }
        });
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map