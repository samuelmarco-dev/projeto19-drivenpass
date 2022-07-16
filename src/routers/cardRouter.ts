import { Router } from "express";

import { createCardUser, deleteCardById, getCardById, getCards } from "../controllers/cardController.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaCard from "../schemas/schemaCard.js";

const cardRouter = Router();

cardRouter.post('/card', validationSchema(schemaCard), validationTokenUser, createCardUser);
cardRouter.get('/cards', validationTokenUser, getCards);
cardRouter.get('/card/:id', validationTokenUser, getCardById);
cardRouter.delete('/card/:id', validationTokenUser, deleteCardById);

export default cardRouter;
