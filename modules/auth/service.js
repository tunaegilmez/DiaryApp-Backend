import Model from "./model.js";

const addUser = async (name, email, password) => {
  return new Model.User({ name, email, password }).save();
};

export default {
  addUser,
};
