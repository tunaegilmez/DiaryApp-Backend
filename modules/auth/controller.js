import Service from "./service.js";
import Joi from "@hapi/joi";

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  if (!email && !password) {
    return res.json({
      status: false,
      message: JSON.stringify({
        en: "email or password should send with request.",
        tr: "email veya password gönderilmeli.",
      }),
    });
  }

  try {
    let login = await Service.login(email, password);

    return res.json({
      status: true,
      ...login,
    });
  } catch (error) {
    console.log(error.message, "login error");
    return res.json({ status: false, message: error.message });
  }
};

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(6).max(255),
});

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  try {
    let addedUser = await Service.addUser(name, email, password);
    return res.json({ status: true, addedUser });
  } catch (error) {
    console.log("addUser error", error.message);
  }
};

export default {
  addUser,
  login,
};
