import { Session, User } from "@prisma/client";
import { NoteBody } from "../schemas/schemaNote.js";
import { verifyUser } from "./authService.js";
import * as secureNoteRepository from "../repositories/secureNoteRepository.js";

export async function createSecureNote(note: NoteBody, user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const noteFound = await secureNoteRepository.secureNoteExists(note);
    if(noteFound) throw {
        type: "SecureNoteAlreadyExists",
        message: "Secure note already exists"
    }

    await secureNoteRepository.createSecureNote(note, user);
}

export async function getSecureNotes(){

}

export async function getSecureNoteById(){

}

export async function deleteSecureNoteById(){

}
