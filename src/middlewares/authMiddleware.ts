import { NextFunction, Request, Response } from "express";

import { verifyValidToken } from "../utils/verifyToken.js";

export default async function validationTokenUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token: string = authorization?.replace('Bearer ', '').trim();
    if(!token) return res.sendStatus(401);

    const sessionToken = await verifyValidToken(token);

    res.locals.token = token;
    res.locals.session = sessionToken.session;
    next();
}
