import User from "../models/User.js";
import bcrypt from "bcryptjs";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) {
      return res.status(404).json({ message: "No Users Found!" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error: "Internal server error" });
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User is already exists." });
    }

    const hashedPassord = bcrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassord,
      blogs : []
    });
    user.save();

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exits" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect passoword" });
    }

    return res.status(200).json({ message: "Login successfull" });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export { getAllUsers, signUp, login };
