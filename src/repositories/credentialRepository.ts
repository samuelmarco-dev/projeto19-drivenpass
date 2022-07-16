import dayjs from "dayjs";

import prisma from "../config/database.js";
import { User } from "@prisma/client";
import { CredentialData } from "../schemas/schemaCredencial.js";

export async function credentialExists(credential: CredentialData, user: User){
    return await prisma.credential.findFirst({
        where: {
            title: credential.title,
            userId: user.id
        }
    });
}

export async function insertCredential(credential: CredentialData, user: User){
    await prisma.credential.create({
        data: {
            ...credential,
            userId: user.id,
            isDeleted: false,
            createdAt: dayjs().format(),
            updatedAt: dayjs().format()
        }
    });
}

export async function getCredentials(user: User){
    return await prisma.credential.findMany({
        where: {
            userId: user.id,
            isDeleted: false
        }
    });
}

export async function getCredentialById(id: number, user: User){
    return await prisma.credential.findFirst({
        where: {
            id,
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function deleteCredentialById(id: number){
    await prisma.credential.update({
        where: {
            id
        },
        data: {
            isDeleted: true,
            updatedAt: dayjs().format()
        }
    });
}
