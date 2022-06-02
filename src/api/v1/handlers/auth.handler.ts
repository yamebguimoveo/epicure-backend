import jwt from "jsonwebtoken";

interface UserPayload {
  email: string;
  name: string;
}

export class AuthHandler {
  async verify(authorization: any): Promise<UserPayload> {
    try {
      if (!authorization) throw "Token is missing";
      if (!authorization.startsWith("Bearer ")) {
        throw "Token is missing";
      }
      const token = authorization.split(" ")[1];
      if (!token) {
        throw "Token is missing";
      }
      const decoded = await jwt.verify(
        token,
        process.env.JWT_SECRET || "SECRET"
      );
      if (typeof decoded !== "string") {
        const { email, name } = decoded;
        if (!!email && !!name) {
          return { email, name };
        }
      }
      throw "Payload is wrong or invalid";
    } catch (err) {
      throw err;
    }
  }
}
