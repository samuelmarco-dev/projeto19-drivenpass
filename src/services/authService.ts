import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import * as userRepository from "../repositories/usersRepository.js";
import * as sessionRepository from "../repositories/sessionsRepository.js";
import { User } from '../repositories/usersRepository.js';

interface TokenPayload{
    id: string;
    iat: number;
    expiresIn: number;
}

export async function createSignUpUser(email: string, password: string){
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const objUser = {
        email, password: encryptedPassword
    }
    await userRepository.insertUser(objUser);
}

export async function createSignInUser(user: User, password: string){
    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword) throw {
        type: "InvalidPassword",
        message: "Invalid password"
    }

    const secret = process.env.JWT_SECRET;
    const validity = { expiresIn: 3600}
    const token = jwt.sign({
        id: user.id
    }, secret, validity);

    await sessionRepository.insertSessionUser(token, user);
    return token;
}

export async function createLogoutUser(token: string) {
    const userId = verifyValidToken(token);
    const user = await userRepository.findUserById(Number(userId));

    if(!user) throw{
        type: "UserNotFound",
        message: "User not found"
    }
    if(Number(userId) !== user.id) throw{
        type: "UserIdNotMatch",
        message: "User id not match"
    }

    await sessionRepository.updateSession(token, user.id);
}

async function verifyValidToken(token: string){
    const secret = process.env.JWT_SECRET;
    const verification = jwt.verify(token, secret);

    if(!verification) throw{
        type: "InvalidToken",
        message: "Invalid token"
    }
    const {id} = verification as TokenPayload;

    const session = await sessionRepository.findSessionUser(token);
    const verifySession = !session || !session.isActive || session.userId !== Number(id);
    if(verifySession) throw{
        type: "SessionError",
        message: "Session error"
    }

    return id;
}
