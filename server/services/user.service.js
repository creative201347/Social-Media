import UserModel from "../models/user.model.js";

export async function getUserById(id) {
  return UserModel.findOne(id);
}
