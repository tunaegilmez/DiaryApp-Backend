import Service from "./service.js";
import Joi from "@hapi/joi";

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
};
