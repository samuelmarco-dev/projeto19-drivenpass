import { Session, User } from "@prisma/client";
import { NoteBody } from "../schemas/schemaNote.js";
import { verifyUser } from "./authService.js";
import * as secureNoteRepository from "../repositories/secureNoteRepository.js";

export async function createSecureNote(note: NoteBody, user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const noteFound = await secureNoteRepository.secureNoteExists(note, user);
    if(noteFound) throw {
        type: "SecureNoteAlreadyExists",
        message: "Secure note already exists"
    }

    await secureNoteRepository.createSecureNote(note, user);
}

export async function getSecureNotes(user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const secureNotes = await secureNoteRepository.getSecureNotes(user);
    return {
        userLogin: user.email,
        secureNotes
    };
}

export async function getSecureNoteById(id: number, user: User, session: Session){
    const idUser = session.userId;
    verifyUser(user, idUser);

    const secureNote = await secureNoteRepository.getSecureNoteById(id, user);
    const verify = !secureNote || secureNote.userId !== user.id || secureNote.id !== id;

    if(verify) throw {
        type: "SecureNoteNotFound",
        message: "Secure note not found"
    }

    return secureNote;
}

export async function deleteSecureNoteById(id: number, user: User, session: Session){
    const idUser = session.userId;
    verifyUser(user, idUser);

    const secureNote = await secureNoteRepository.getSecureNoteById(id, user);
    const verify = !secureNote || secureNote.userId !== user.id || secureNote.id !== id

    if(verify) throw {
        type: "SecureNoteNotFound",
        message: "Secure note not found"
    }

    await secureNoteRepository.deleteSecureNoteById(id);
}
