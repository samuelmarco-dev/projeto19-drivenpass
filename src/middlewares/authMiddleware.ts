import { NextFunction, Request, Response } from "express";

export default async function validationTokenUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token: string = authorization?.replace('Bearer ', '').trim();
    if(!token) return res.sendStatus(401);

    res.locals.token = token;
    next();
}
