import { NextFunction, Request, Response } from "express";

import { verifyValidToken } from "../utils/verifyToken.js";

export default async function validationTokenUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token: string = authorization?.replace('Bearer ', '').trim();
    if(!token) return res.sendStatus(401);

    const sessionToken = await verifyValidToken(token);
    const { id, session } = sessionToken;
    if(id !== session.userId) return res.sendStatus(401);

    res.locals.token = token;
    res.locals.session = session;
    next();
}
