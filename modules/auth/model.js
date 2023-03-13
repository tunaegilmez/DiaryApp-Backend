import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true, min: 3, max: 255 },
      email: { type: String, required: true, min: 6, max: 255, unique: true },
      password: { type: String, required: true, min: 6, max: 1024 },
      date: { type: Date, default: Date.now },
    },
    { timestamps: true }
  )
);

export default {
  User,
};
