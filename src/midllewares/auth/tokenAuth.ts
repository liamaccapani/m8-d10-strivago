import jwt from "jsonwebtoken";
import { User } from "../../types/interfaces";

// generates token: payload + secret string + options (expiresIn)
export const JWTGenerateToken = (payload: { _id: string }) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "6h" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    )
  );

// verify --> returns an errorn if token does not match
// export because needed in middleware also
export const verifyToken = (token: string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET!, (error, decodedToken) => {
      if (error) reject(error);
      else resolve(decodedToken);
    })
  );

export const generateToken = async (user: User) => {
  // given the user --> generates token --> pass ID in payload
  const accessToken = await JWTGenerateToken({ _id: user._id });

  return accessToken;
};