import express from "express";
import { registerUser , login } from "../controllers/userController.js";
import { validate } from "../middleware/validator.js";
import { userValidatorSchema,loginValidatorSchema } from "../validators/userValidators.js";
const router = express.Router();

router.post("/register",validate(userValidatorSchema), registerUser);
router.post("/login",validate(loginValidatorSchema),login);

export default router;