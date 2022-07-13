import { NextFunction, Request, Response } from "express";
import { User } from "../schemas/schemaAuth";

export default async function verifyRegisteredUser(req: Request, res: Response, next: NextFunction){
    const { email, password }: User = req.body;
    if(!email || !password) return res.sendStatus(400);

    const userFound = '';
    res.locals.user = userFound;
    next();
}
