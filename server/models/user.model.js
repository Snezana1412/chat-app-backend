import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  is_activated: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account",
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: false,
  },
  lastOnline: { type: Date, default: Date.now },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  try {
    // if password not modified, skip the hashing
    if (!this.isModified("password")) {
      next();
    }

    // if password modified, hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.update_at = Date.now(); // set the password update time
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

/* ------------ verification token ------------ */
const verifySchema = new Schema({
  token: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

export const verify = model("Verify", verifySchema);
export default User;
