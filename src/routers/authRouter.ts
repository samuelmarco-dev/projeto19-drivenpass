import { Router } from "express";

import { createSignInUser, createSignUpUser } from "../controllers/authController.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaAuth from "../schemas/schemaAuth.js";

const authRouter = Router();

authRouter.post('/sign-up', validationSchema(schemaAuth), createSignUpUser);
authRouter.post('/sign-in', validationSchema(schemaAuth), createSignInUser);

export default authRouter;
