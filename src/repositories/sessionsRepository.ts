import sqlsting from "sqlstring";

import connection from "../config/database.js";
import { User } from "./usersRepository.js";

export interface UserSession {
    id: number;
    userId: number;
    token: string;
    isActive: boolean;
}

type CreateSeassion = Omit<UserSession, "id">;

export async function insertSessionUser(token: string, user: User){
    const sql = sqlsting.format(`
        INSERT INTO "sessions" ("userId", "token", "isActive")
        VALUES (?, ?, ?)
    `, [user.id, token, true]);

    await connection.query<CreateSeassion>(sql);
}

export async function findSessionUser(token: string){
    const sql = sqlsting.format(`
        SELECT * FROM "sessions" WHERE "token" = ?
    `, [token]);

    const result = await connection.query<UserSession>(sql);
    return result.rows[0];
}

export async function updateSession(token: string, userId: number){
    const sql = sqlsting.format(`
        UPDATE "sessions" SET "isActive" = ? WHERE "token" = ? AND "userId" = ?
    `, [false, token, userId]);

    await connection.query(sql);
}
