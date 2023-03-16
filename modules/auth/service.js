import Model from "./model.js";
import { hashPassword, checkPassword } from "../utilities/bcrypt.js";
import Jwt from "jsonwebtoken";

const getUserByEmail = async email => {
  return Model.User.findOne({ email });
};

const addUser = async (name, email, password) => {
  if (password) {
    password = await hashPassword(password);
  }

  let savedUser = await new Model.User({ name, email, password }).save();

  console.log("savedUser", savedUser);
  const token = Jwt.sign(
    {
      type: "user",
      _id: savedUser?._id?.toString(),
      email: email,
    },
    process.env.JWT_CODE
  );

  return { savedUser, token };
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

    const token = Jwt.sign(
      {
        type: "user",
        _id: userExists?._id?.toString(),
        email: userExists.email,
      },
      process.env.JWT_CODE
    );

    return {
      token,
      userId: userExists._id,
      username: userExists.email,
    };
  } catch (error) {
    console.log("login error", error.message);
    throw new Error(error.message);
  }
};

export default {
  addUser,
  login,
};
