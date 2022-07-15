import { Router } from "express";

import { createCredentialUser, getCredential, getCredentialById, deleteCredentialById } from "../controllers/credentialController.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaCredencial from "../schemas/schemaCredencial.js";

const credentialRouter = Router();

credentialRouter.post('/credential', validationSchema(schemaCredencial), validationTokenUser, createCredentialUser);
credentialRouter.get('/credentials', validationTokenUser, getCredential);
credentialRouter.get('/credential/:id', validationTokenUser, getCredentialById);
credentialRouter.delete('/credential/:id', validationTokenUser, deleteCredentialById);

export default credentialRouter;
