import mongoose from "mongoose";

const Diary = mongoose.model(
  "Diary",
  new mongoose.Schema(
    {
      title: String,
      description: String,
    },
    { timestamps: true }
  )
);

export default {
  Diary,
};
