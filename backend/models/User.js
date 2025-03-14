import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
