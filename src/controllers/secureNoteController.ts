import { Request, Response } from "express";

import { Session } from '@prisma/client';
import { NoteBody } from "../schemas/schemaNote.js";
import * as secureNoteService from "../services/secureNoteService.js";
import * as userRepository from "../repositories/usersRepository.js";

export async function createSecureNoteUser(req: Request, res: Response){
    const { title, content }: NoteBody = req.body;
    const session: Session = res.locals.session;

    if(!title || !content) return res.status(400).send("Missing title or content");
    const user = await userRepository.findUserById(session.userId);

    await secureNoteService.createSecureNote({ title, content }, user, session);
    res.sendStatus(201);
}

export async function getSecureNotes(req: Request, res: Response){

}

export async function getSecureNoteById(req: Request, res: Response){

}

export async function deleteSecureNoteById(req: Request, res: Response){

}
