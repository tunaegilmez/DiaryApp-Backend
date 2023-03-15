import Model from "./model.js";
import { hashPassword, checkPassword } from "../utilities/bcrypt.js";

const getUserByEmail = async email => {
  return Model.User.findOne({ email });
};

const addUser = async (name, email, password) => {
  if (password) {
    password = await hashPassword(password);
  }
  return new Model.User({ name, email, password }).save();
};

const login = async (email, password) => {
  try {
    let userExists;

    if (email) {
      userExists = await getUserByEmail(email);
    }

    if (!userExists) {
      throw new Error(
        JSON.stringify({
          en: "User is not found.",
          tr: "Kullanıcı bulunamadı.",
        })
      );
    }

    let check = await checkPassword(userExists.password, password);

    if (!check) {
      throw new Error(
        JSON.stringify({
          en: "Wrong password.",
          tr: "Yanlış şifre.",
        })
      );
    }
  } catch (error) {
    console.log("login error", error.message);
    throw new Error(error.message);
  }
};

export default {
  addUser,
  login,
};
