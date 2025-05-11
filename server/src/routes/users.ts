import express from "express";

import userController from "../controllers/users";

const router = express.Router();

router.get("/", userController.getHistory);

router.post("/", userController.saveUser);

router.put("/:userId", userController.updateUser);

router.delete("/:userId", userController.deleteUser);

export default router;
