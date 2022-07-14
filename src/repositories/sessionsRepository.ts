import dayjs from "dayjs";

import prisma from "../config/database.js";
import { User } from "@prisma/client";

export async function insertSessionUser(token: string, user: User){
    await prisma.session.create({
        data: {
            userId: user.id,
            token,
            isActive: true,
            createdAt: dayjs().format(),
            updatedAt: dayjs().format()
        }
    })
}

export async function findSessionUser(token: string){
    return await prisma.session.findUnique({
        where: { token }
    });
}

export async function updateSession(token: string){
    await prisma.session.update({
        where: { token },
        data: {
            isActive: false,
            updatedAt: dayjs().format()
        }
    })
}
