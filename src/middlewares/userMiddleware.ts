import { NextFunction, Request, Response } from "express";

import { User } from "@prisma/client";
import { UserBody } from "../schemas/schemaAuth.js";
import emailIncludesUpperCase from "../utils/verifyString.js";
import * as userRepository from "../repositories/usersRepository.js";

export default async function verifyRegisteredUser(req: Request, res: Response, next: NextFunction){
    const { email, password }: UserBody = req.body;
    if(!email || !password) return res.sendStatus(400);
    if(emailIncludesUpperCase(email)) return res.status(422).send('Email must contain only lowercase characters');

    const userFound: User = await userRepository.findUserByEmail(email);
    
    res.locals.user = userFound;
    next();
}
