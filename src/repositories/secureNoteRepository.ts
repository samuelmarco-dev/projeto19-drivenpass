import { User } from "@prisma/client";
import dayjs from "dayjs";
import prisma from "../config/database.js";
import { NoteBody } from "../schemas/schemaNote.js";

export async function secureNoteExists(secureNote: NoteBody){
    return await prisma.secureNote.findFirst({
        where: {
            title: secureNote.title,
            content: secureNote.content
        }
    })
}

export async function createSecureNote(secureNote: NoteBody, user: User) {
    await prisma.secureNote.create({
        data: {
            ...secureNote,
            userId: user.id,
            isDeleted: false,
            createdAt: dayjs().format(),
            updatedAt: dayjs().format()
        }
    })
}
