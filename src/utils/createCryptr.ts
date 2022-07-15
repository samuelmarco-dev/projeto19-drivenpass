import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config();

export function createCryptrData(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    const encryptedPassword = cryptr.encrypt(password);

    return encryptedPassword;
}

export function decryptCryptrData(password: string){
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    const decryptedPassword = cryptr.decrypt(password);

    return decryptedPassword;
}
