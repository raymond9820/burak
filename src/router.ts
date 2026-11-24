//One step from  request frontend to backend
//router => URL => controller => service => model => database.

import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import { verify } from "jsonwebtoken";

// asnwer response Json format:
//member
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.get("/member/detail", memberController.verifyAuth);

//Product

export default router;
