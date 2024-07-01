import User from "../models/User.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No Users Found!" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error: "Internal server error" });
  }
};

const signUp = async (req, res, next) => {
//   const { name, email, password } = req.body;
  console.log(req.body);
  return;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User is already exists." });
    }

    const user = new User({
      name,
      email,
      password,
    });
    user.save();

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export { getAllUsers, signUp };
