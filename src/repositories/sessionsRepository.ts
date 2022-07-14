import dayjs from "dayjs";

import prisma from "../config/database.js";
import { User } from "@prisma/client";

export async function insertSessionUser(token: string, user: User){
    // const sql = sqlsting.format(`
    //     INSERT INTO "sessions" ("userId", "token", "isActive")
    //     VALUES (?, ?, ?)
    // `, [user.id, token, true]);

    // await connection.query<CreateSeassion>(sql);
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
    // const sql = sqlsting.format(`
    //     SELECT * FROM "sessions" WHERE "token" = ?
    // `, [token]);

    // const result = await connection.query<UserSession>(sql);
    // return result.rows[0];

    return await prisma.session.findUnique({
        where: { token }
    });
}

export async function updateSession(token: string){
    // const sql = sqlsting.format(`
    //     UPDATE "sessions" SET "isActive" = ? WHERE "token" = ? AND "userId" = ?
    // `, [false, token, userId]);

    // await connection.query(sql);

    await prisma.session.update({
        where: { token },
        data: {
            isActive: false,
            updatedAt: dayjs().format()
        }
    })
}
