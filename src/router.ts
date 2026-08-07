import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

router.get("/", memberController.goHome);

router.get("/login", memberController.getLOgin);

router.get("/signup", memberController.getSignUp);

export default router;
