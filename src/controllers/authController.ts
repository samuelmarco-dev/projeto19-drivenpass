import { Request, Response } from "express";

import { UserBody } from "../schemas/schemaAuth.js";
import { User } from "../repositories/usersRepository.js";
import { UserSession } from "../repositories/sessionsRepository.js";
import * as authService from "../services/authService.js";
import * as userRepository from "../repositories/usersRepository.js";

export async function createSignUpUser(req: Request, res: Response){
    const { email, password }: UserBody = req.body;
    const user: User = res.locals.user;
    if(user) return res.status(409).send('User already registered in the database');

    await authService.createSignUpUser(email, password);
    return res.sendStatus(201);
}

export async function createSignInUser(req: Request, res: Response){
    const { email, password }: UserBody = req.body;
    const  user: User = res.locals.user;

    const verifyUser = user.email !== email || !user;
    if(verifyUser) return res.status(404).send('User not registered in the database');

    const token = await authService.createSignInUser(user, password);
    return res.status(200).send(token);
}

export async function createLogoutUser(req: Request, res: Response){
    const token: string = res.locals.token;
    const session: UserSession = res.locals.session;

    const user = await userRepository.findUserById(session.userId);

    await authService.createLogoutUser(token, session, user);
    res.sendStatus(200);
}
