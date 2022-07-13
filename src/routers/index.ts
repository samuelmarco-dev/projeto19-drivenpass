import { Router } from "express";

import authRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import secureNoteRouter from "./secureNote.js";
import wifiRouter from "./wifiRouter.js";

const routes = Router();

routes.use(authRouter);
routes.use(credentialRouter);
routes.use(cardRouter);
routes.use(secureNoteRouter);
routes.use(wifiRouter);

export default routes;
