//One step from  request frontend to backend
//router => URL => controller => service => model => database.

import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

// asnwer response Json format:

router.post("/login", memberController.login);
router.post("/signup", memberController.signup);

export default router;
