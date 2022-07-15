import bcrypt from 'bcrypt';

import { Session, User } from "@prisma/client";
import { CredentialData } from "../schemas/schemaCredencial.js";
import { verifyUser } from "./authService.js";
import * as credentialRepository from "../repositories/credentialRepository.js";

export async function createCredential(credential: CredentialData, user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const credentialFound = await credentialRepository.credentialExists(credential, user);
    if(credentialFound) throw {
        type: "CredentialAlreadyExists",
        message: "Credential already exists"
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(credential.password, salt);

    await credentialRepository.insertCredential({ ...credential, password: encryptedPassword }, user);
}
