import createHttpError from "http-errors";
import userModel from "../../services/users/schema.js"
import { verifyToken } from "./tokenAuth.js";
import { Request, Response, NextFunction } from 'express'


export const tokenAuthMiddleware = async (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    try {
      // const token = req.headers.authorization.split(" ")[1] OR
      const token = req.headers.authorization.replace("Bearer ", "");
      const decodedToken: any = await verifyToken(token);
      // decoded token = _id, iat, exp
      console.log("Decoded Token: ", decodedToken)
      // see payload JWTAuthGenerate
      const user = await userModel.findById(decodedToken._id);
      if (user) {
        // 🦄🌈✨
        req.user = user;
        next();
      } else {
        next(createHttpError(404, "User not found"));
      }
    } catch (error) {
      next(createHttpError(401, "Token not valid"));
    }
  } else {
    next(createHttpError(401, "Provide credentials"));
  }
};
