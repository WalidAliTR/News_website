import express from "express";
const router = express.Router();

import { getUsers, getUserById , updateUser } from "../controllers/usersController.js";


router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);


export default router;