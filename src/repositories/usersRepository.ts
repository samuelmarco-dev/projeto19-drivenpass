import sqlsting from "sqlstring";

import connection from "../config/database.js";
import { UserBody } from "../schemas/schemaAuth.js";

export interface User{
    id: number;
    email: string;
    password: string;
}

export async function findUserByEmail(email: string){
    const sql = sqlsting.format(`
        SELECT * FROM "users" WHERE "email" = ?
    `, [email]);

    const result = await connection.query<User, [string]>(sql);
    return result.rows[0];
}

export async function findUserById(id: number){
    const sql = sqlsting.format(`
        SELECT * FROM "users" WHERE "id" = ?
    `, [id]);

    const result = await connection.query<User, [number]>(sql);
    return result.rows[0];
}

export async function insertUser(user: UserBody){
    const { email, password } = user
    const sql = sqlsting.format(`
        INSERT INTO "users" ("email", "password")
        VALUES (?, ?)
    `, [email, password]);

    connection.query(sql);
}
