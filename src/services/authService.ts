import bcrypt from "bcrypt";

import * as authRepository from "../repositories/authRepository.js";

export async function createSignUpUser(email: string, password: string){
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const objUser = {
        email, password: encryptedPassword
    }
    await authRepository.insertUser(objUser);
}
