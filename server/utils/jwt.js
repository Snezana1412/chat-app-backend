import jwt from "jsonwebtoken";
import { promisify } from "util";

// to create  a jwt token
export const createToken = async (payload, secret, options) => {
  const asyncSign = promisify(jwt.sign);
  return await asyncSign(payload, secret, options);
};

// to verify the jwt token
export const verifyToken = async (token, secret) => {
  const asyncVerify = promisify(jwt.verify);
  return await asyncVerify(token, secret);
};
