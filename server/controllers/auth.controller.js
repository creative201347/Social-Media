import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  req.body.password = hash;

  const newUser = new UserModel(req.body);
  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY || "mysecret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ message: "Wrong Credentials" });
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY || "mysecret",
          { expiresIn: "1h" }
        );
        return res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
