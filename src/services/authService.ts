import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Session, User } from "@prisma/client";
import * as userRepository from "../repositories/usersRepository.js";
import * as sessionRepository from "../repositories/sessionsRepository.js";

export async function createSignUpUser(email: string, password: string){
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await userRepository.insertUser({ email, password: encryptedPassword });
}

export async function createSignInUser(user: User, password: string){
    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword) throw {
        type: "InvalidPassword",
        message: "Invalid password"
    }

    const secret = process.env.JWT_SECRET;
    const validity = { expiresIn: 3600 }
    const token = jwt.sign({
        id: user.id
    }, secret, validity);

    await sessionRepository.insertSessionUser(token, user);
    return token;
}

export async function createLogoutUser(token: string, session: Session, user: User) {
    const id = session.userId;
    verifyUser(user, id);

    await sessionRepository.updateSession(token);
}

export function verifyUser(user: User, id: number){
    if(!user) throw{
        type: "UserNotFound",
        message: "User not found"
    }
    if(id !== user.id) throw{
        type: "UserIdNotMatch",
        message: "User id not match"
    }
}
