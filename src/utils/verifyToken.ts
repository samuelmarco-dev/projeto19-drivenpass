import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import * as sessionRepository from "../repositories/sessionsRepository.js";
import { UserSession } from "../repositories/sessionsRepository.js";

interface TokenPayload{
    id: string;
    iat: number;
    expiresIn: number;
}

export async function verifyValidToken(token: string){
    try {
        const secret = process.env.JWT_SECRET;
        const verification = jwt.verify(token, secret);

        if(!verification) throw{
            type: "InvalidToken",
            message: "Invalid token"
        }

        const {id} = verification as TokenPayload;
        const session = await sessionRepository.findSessionUser(token);
        verifyFindUserSession(session);

        return {
            id: Number(id),
            session: session
        };
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            const session = await sessionRepository.findSessionUser(token);
            verifyFindUserSession(session);

            await sessionRepository.updateSession(token, session.userId);
        }
        throw {
            type: "InvalidToken",
            message: "Invalid token"
        }
    }
}

function verifyFindUserSession(session: UserSession){
    const verifySession = !session || !session.isActive;
    if(verifySession) throw{
        type: "SessionError",
        message: "Session error"
    }
}
