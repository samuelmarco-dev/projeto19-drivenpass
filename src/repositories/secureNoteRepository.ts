import dayjs from "dayjs";

import prisma from "../config/database.js";
import { User } from "@prisma/client";
import { NoteBody } from "../schemas/schemaNote.js";

export async function secureNoteExists(secureNote: NoteBody, user: User){
    return await prisma.secureNote.findFirst({
        where: {
            title: secureNote.title,
            content: secureNote.content,
            userId: user.id
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

export async function getSecureNotes(user: User) {
    return await prisma.secureNote.findMany({
        where: {
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function getSecureNoteById(id: number, user: User){
    return await prisma.secureNote.findFirst({
        where: {
            id,
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function deleteSecureNoteById(id: number){
    await prisma.secureNote.update({
        where: {
            id
        },
        data: {
            isDeleted: true,
            updatedAt: dayjs().format()
        }
    })
}
