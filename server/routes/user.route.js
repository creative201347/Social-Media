import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  UnFollowUser,
  updateUser,
  getAllUser,
} from "../controllers/user.controller.js";
import AuthMiddleWare from "../middlewares/Authmiddleware.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.put("/:id", AuthMiddleWare, updateUser);
router.delete("/:id", AuthMiddleWare, deleteUser);
router.put("/:id/follow", AuthMiddleWare, followUser);
router.put("/:id/unfollow", AuthMiddleWare, UnFollowUser);

export default router;
