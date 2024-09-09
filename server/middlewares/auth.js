import User from "../models/user.model.js";
import { createError } from "../utils/helper.js";
import { verifyToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
  try {
    // // check if the token is present
    // let token;
    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // ) {
    //   token = req.cookies.jwt_token; //|| req.headers?.authorization?.split(" ")[1]  // 'Bearer lksdfjsldkfjslkfjsflksjdflksjdflskjf'
    //   console.log("🚀 ~ protect ~ token:", token);
    // }

    // if (!token) {
    //   //return next(createError("Not authorized to access this route", 401));
    //   throw createError("Not authorized to access this route", 401);
    // }

    // // verify the token
    // const decoded = await verifyToken(token, process.env.JWT_SECRET);

    // // check if the user exists
    // const user = await User.findById(decoded.userId);

    // if (!user) {
    //   //return next(createError("No user found with this id", 404));
    //   throw createError("The user who owns this token, already deleted!", 401);
    // }

    // // user changed his password after token generated
    // const token_issue_time = token_payload.iat * 1000;
    // const password_changed_time = new Date(user.update_at).getTime();
    // if (token_issue_time < password_changed_time) {
    //   throw createError(
    //     "The token is not valid anymore, because the password changed.",
    //     401
    //   );
    // }

    // // attach the payload of token to the request
    // req.token_payload = decoded;

    // next();

    // extract token from req.cookies
    const token = req.cookies.jwt_token;

    if (!token) {
      res.status(400).json({
        status: "failure",
        msg: "cookie not exist",
      });
    }

    // verify token
    const token_payload = await verifyToken(token, process.env.JWT_SECRET);

    // verify the payload
    const userId = await User.findById(token_payload.userId);
    if (!userId) {
      throw createError("User already deleted!", 401);
    }

    req.token_payload = token_payload;

    next();
  } catch (error) {
    //next(createError("Not authorized to access this route", 401));
    next(error);
  }
};
