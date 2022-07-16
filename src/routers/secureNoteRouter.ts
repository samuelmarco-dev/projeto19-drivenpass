import { Router } from "express";

import { createSecureNoteUser, deleteSecureNoteById, getSecureNoteById, getSecureNotes } from "../controllers/secureNoteController.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaNote from "../schemas/schemaNote.js";

const secureNoteRouter = Router();

secureNoteRouter.post('/note', validationSchema(schemaNote), validationTokenUser, createSecureNoteUser);
secureNoteRouter.get('/notes', validationTokenUser, getSecureNotes);
secureNoteRouter.get('/note/:id', validationTokenUser, getSecureNoteById);
secureNoteRouter.delete('/note/:id', validationTokenUser, deleteSecureNoteById);

export default secureNoteRouter;
