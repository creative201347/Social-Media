import UserModel from "../models/user.model.js";

export async function createUser(user) {
  return UserModel.create(user);
}
export async function findUser(username) {
  return UserModel.findOne(username);
}
