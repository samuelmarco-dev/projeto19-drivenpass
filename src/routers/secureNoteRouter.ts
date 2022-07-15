import { Router } from "express";

import { createSecureNoteUser, deleteSecureNoteById, getSecureNoteById, getSecureNotes } from "../controllers/secureNoteController";
import validationTokenUser from "../middlewares/authMiddleware";
import validationSchema from "../middlewares/schemaMiddleware";
import schemaNote from "../schemas/schemaNote";

const secureNoteRouter = Router();

secureNoteRouter.post('/note', validationSchema(schemaNote), validationTokenUser, createSecureNoteUser);
secureNoteRouter.get('/notes', validationTokenUser, getSecureNotes);
secureNoteRouter.get('/note/:id', validationTokenUser, getSecureNoteById);
secureNoteRouter.delete('/note/:id', validationTokenUser, deleteSecureNoteById);

export default secureNoteRouter;
