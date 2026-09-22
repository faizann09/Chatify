import express from "express";
const router = express.Router();
import { signup, login, logout, getUserProfile } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

router.post("/signup", signup);

router.post("/login", login); 

router.post("/logout", logout);

router.get("/getUserProfile",secureRoute,getUserProfile);

export default router;