import UserModel from "../models/user.model.js";
import { getUserById } from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserById({ id });
    if (!user) {
      return res.status(404).json("No such user exists");
    }

    const { password, createdAt, updatedAt, __v, ...otherDetails } = user._doc;
    return res.status(200).json(otherDetails);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY || "mysecret",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res
      .status(403)
      .json("Access Denied! you can only update your own profile");
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json("User deleted successfully");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res
      .status(403)
      .json("Access Denied! you can only delete your own profile");
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json({ message: "Action forbidden" });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        return res.status(200).json("User followed!");
      } else {
        return res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const UnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
