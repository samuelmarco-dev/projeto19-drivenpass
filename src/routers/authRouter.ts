import { Router } from "express";

import { createLogoutUser, createSignInUser, createSignUpUser } from "../controllers/authController.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import verifyRegisteredUser from "../middlewares/userMiddleware.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import schemaAuth from "../schemas/schemaAuth.js";

const authRouter = Router();

authRouter.post('/sign-up', validationSchema(schemaAuth), verifyRegisteredUser, createSignUpUser);
authRouter.post('/sign-in', validationSchema(schemaAuth), verifyRegisteredUser, createSignInUser);
authRouter.post('/logout', validationTokenUser, createLogoutUser);

export default authRouter;
