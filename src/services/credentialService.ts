import { Session, User } from "@prisma/client";
import { CredentialData } from "../schemas/schemaCredencial.js";
import { verifyUser } from "./authService.js";
import * as credentialRepository from "../repositories/credentialRepository.js";
import { createCryptrData, decryptCryptrData } from "../utils/createCryptr.js";

export async function createCredential(credential: CredentialData, user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const credentialFound = await credentialRepository.credentialExists(credential, user);
    if(credentialFound) throw {
        type: "CredentialAlreadyExists",
        message: "Credential already exists"
    }

    const encryptedPassword = createCryptrData(credential.password);
    await credentialRepository.insertCredential({ ...credential, password: encryptedPassword }, user);
}

export async function getCredentials(user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const credentials = await credentialRepository.getCredentials(user);
    const credentialDecrypted = await returnCredentialsPassword(credentials);

    return {
        userLogin: user.email,
        credentials: credentialDecrypted
    };
}

async function returnCredentialsPassword(credentials: CredentialData[]){
    return credentials.map(credential => {
        const { password } = credential;
        const decryptedPassword = decryptCryptrData(password);
        return { ...credential, password: decryptedPassword };
    });
}
