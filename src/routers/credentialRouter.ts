import { Router } from "express";

import { createCredentialUser, getCredential, getCredentialById } from "../controllers/credentialController.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaCredencial from "../schemas/schemaCredencial.js";

const credentialRouter = Router();

credentialRouter.post('/credential', validationSchema(schemaCredencial), validationTokenUser, createCredentialUser);
credentialRouter.get('/credentials', validationTokenUser, getCredential);
credentialRouter.get('/credentials/:id', validationTokenUser, getCredentialById);

export default credentialRouter;
