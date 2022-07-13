import { Request, Response } from "express";

import { UserBody } from "../schemas/schemaAuth.js";
import { User } from "../repositories/authRepository.js";
import * as authService from "../services/authService.js";

export async function createSignUpUser(req: Request, res: Response){
    const { email, password }: UserBody = req.body;
    const  user: User = res.locals.user;
    if(user) return res.status(409).send('User already registered in the database');

    await authService.createSignUpUser(email.toLowerCase(), password);
    return res.sendStatus(201);
}

export async function createSignInUser(req: Request, res: Response){

}
