"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const auth_handler_1 = require("../handlers/auth.handler");
const user_handler_1 = require("../handlers/user.handler");
class Authenticator {
    static async protect(req, res, next) {
        try {
            const handler = new auth_handler_1.AuthHandler();
            const userHandler = new user_handler_1.UserHandler();
            const { authorization } = req.headers;
            //jwt payload return from verify ({email,name})
            const { email } = await handler.verify(authorization);
            const existUser = await userHandler.checkIfUserExists(email);
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
    }
    static async restrictToAdmin(req, res, next) {
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
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map