import User, { Verify_token } from "../models/user.model.js";
import {
  createError,
  send_activate_email,
  verification_token,
} from "../utils/helper.js";
import { createToken } from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

/* ----------------- register ----------------- */
export const register = async (req, res, next) => {
  console.log(req.body, "req.body");
  try {
    const { fullName, username, email, password, gender } = req.body;

    // check if the user already exists
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      throw createError("User already exists", 400);
    }

    // create a new user
    const newUser = await User.create({
      fullName,
      username,
      email,
      password,
      gender,
    });

    console.log(newUser, "newUser");

    // remove critical data from the response
    newUser.password = undefined;
    newUser.__v = undefined;

    // create a verification token and save it to the database
    const token = await verification_token(newUser);

    // send an email to the user
    await send_activate_email(newUser, token);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

/* ------------ handle verify link ------------ */
export const handleVerifyLink = async (req, res, next) => {
  try {
    const { token, uid } = req.params;

    // find the verification token
    const verify_token = await Verify_token.findOne({ token, uid });
    if (!verify_token) {
      throw createError("verification link is not valid!", 404);
    }

    // if the token is valid and user clicked, activate the user
    console.log(verify_token, "verify_token");
    const user = await User.findOneAndUpdate(
      { _id: token_doc.userId },
      { is_activated: true }
    );
    res.send("User actived successfully!");
  } catch (error) {
    next(error);
  }
};

/* ----------------- login ----------------- */
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // find user by username
    const user = await User.findOne({ username, is_activated: true });
    if (!user) {
      throw createError("Incorrect username/password!", 403);
    }

    // compare the password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createError("Incorrect username/password!", 403);
    }

    // create a token
    const payload = { userId: user._id, fullName: user.fullName };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1d" };
    const token = await createToken(payload, secret, options);

    user.password = undefined;
    user.__v = undefined;
    user.role = undefined;

    res
      .cookie("jwt_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3_600_000 * 24),
        // path: "/admin"
        //secure: true
      })
      .json({ msg: "Login success", user });
  } catch (error) {
    next(error);
  }
};

/* ----------------- update user  ----------------- */
export const updateUser = async (req, res, next) => {
  try {
    const { fullName, username, email, password, gender } = req.body;
    const uid = req.params.uid;

    const user = await User.findById(uid);
    if (!user) {
      throw createError("User not found!", 404);
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save(); // update the db

    user.password = undefined;
    user.role = undefined;
    res.json({
      msg: "updated success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.token_payload.userId;
    console.log("🚀 ~ getUsers ~ loggedInUserId:", loggedInUserId);

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await User.findById(userId);
    if (!user) {
      throw createError("User not found!", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
