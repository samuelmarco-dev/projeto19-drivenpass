import { Router } from "express";

import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaCredencial from "../schemas/schemaCredencial.js";

const credentialRouter = Router();

credentialRouter.post('/credencial', validationSchema(schemaCredencial), validationTokenUser);

export default credentialRouter;
