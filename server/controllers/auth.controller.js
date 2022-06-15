import bcrypt from "bcrypt";
import { createUser, findUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  let { firstname, lastname, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  password = hash;

  try {
    const user = await createUser({ firstname, lastname, username, password });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUser({ username });
    if (!user) {
      return res.status(404).json("User does not exists");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
