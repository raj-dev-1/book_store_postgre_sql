import express, { Router } from "express";
import { login, profile, register } from "../controllers/user.controller";
import { uploadImgPath } from "../models/user.model";
import {
  loginValidator,
  registerValidator,
} from "../middelware/expressValidator";
import verifyToken from "../middelware/verifyToken";

const router: Router = express.Router();

router.post("/register", uploadImgPath, registerValidator, register);
router.post("/login", loginValidator, login);
router.use(verifyToken);
router.get("/profile", profile);

export default router;
