import { NextFunction, Request, Response } from "express";

import { UserBody } from "../schemas/schemaAuth.js";
import * as authRepository from "../repositories/authRepository.js";

export default async function verifyRegisteredUser(req: Request, res: Response, next: NextFunction){
    const { email, password }: UserBody = req.body;
    if(!email || !password) return res.sendStatus(400);

    const userFound = await authRepository.findUserByEmail(email.toLowerCase());
    res.locals.user = userFound;
    next();
}
