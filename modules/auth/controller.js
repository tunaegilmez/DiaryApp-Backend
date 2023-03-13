import Service from "./service.js";

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

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
