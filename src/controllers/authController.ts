import { Request, Response } from "express";

import { Session, User } from "@prisma/client";
import { UserBody } from "../schemas/schemaAuth.js";
import * as authService from "../services/authService.js";
import * as userRepository from "../repositories/usersRepository.js";

export async function createSignUpUser(req: Request, res: Response){
    const { email, password }: UserBody = req.body;
    const user: User = res.locals.user;
    if(user) return res.status(409).send('User already registered in the database');

    await authService.createSignUpUser(email, password);
    res.sendStatus(201);
}

export async function createSignInUser(req: Request, res: Response){
    const { email, password }: UserBody = req.body;
    const  user: User = res.locals.user;

    if(user.email !== email) return res.sendStatus(404);

    const token = await authService.createSignInUser(user, password);
    return res.status(200).send(token);
}

export async function createLogoutUser(req: Request, res: Response){
    const token: string = res.locals.token;
    const session: Session = res.locals.session;

    const user = await userRepository.findUserById(session.userId);

    await authService.createLogoutUser(token, session, user);
    res.sendStatus(200);
}
