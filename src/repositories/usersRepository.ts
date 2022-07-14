import dayjs from "dayjs";

import prisma from "../config/database.js";
import { UserBody } from "../schemas/schemaAuth.js";

export async function findUserByEmail(email: string){
    // const sql = sqlsting.format(`
    //     SELECT * FROM "users" WHERE "email" = ?
    // `, [email]);

    // const result = await connection.query<User, [string]>(sql);
    // return result.rows[0];

    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function findUserById(id: number){
    // const sql = sqlsting.format(`
    //     SELECT * FROM "users" WHERE "id" = ?
    // `, [id]);

    // const result = await connection.query<User, [number]>(sql);
    // return result.rows[0];

    return await prisma.user.findUnique({
        where: { id }
    })

}

export async function insertUser(user: UserBody){
    // const { email, password } = user
    // const sql = sqlsting.format(`
    //     INSERT INTO "users" ("email", "password")
    //     VALUES (?, ?)
    // `, [email, password]);

    // connection.query(sql);
    await prisma.user.create({
        data: {
            ...user,
            createdAt: dayjs().format()
        }
    })
}
