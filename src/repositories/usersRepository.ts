import dayjs from "dayjs";

import prisma from "../config/database.js";
import { UserBody } from "../schemas/schemaAuth.js";

export async function findUserByEmail(email: string){
    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function findUserById(id: number){
    return await prisma.user.findUnique({
        where: { id }
    });
}

export async function insertUser(user: UserBody){
    await prisma.user.create({
        data: {
            ...user,
            createdAt: dayjs().format()
        }
    });
}
