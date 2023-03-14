import Model from "./model.js";
import { hashPassword } from "../utilities/bcrypt.js";

const addUser = async (name, email, password) => {
  if (password) {
    password = await hashPassword(password);
  }
  return new Model.User({ name, email, password }).save();
};

export default {
  addUser,
};
