import { User } from "@prisma/client";
import dayjs from "dayjs";

import prisma from "../config/database.js";
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
