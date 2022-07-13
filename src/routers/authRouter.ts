import { Router } from "express";

import { createSignInUser, createSignUpUser } from "../controllers/authController.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import verifyRegisteredUser from "../middlewares/userMiddleware.js";
import schemaAuth from "../schemas/schemaAuth.js";

const authRouter = Router();

authRouter.post('/sign-up', validationSchema(schemaAuth), verifyRegisteredUser, createSignUpUser);
authRouter.post('/sign-in', validationSchema(schemaAuth), verifyRegisteredUser, createSignInUser);

export default authRouter;
