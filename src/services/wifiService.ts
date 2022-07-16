import { Session, User } from "@prisma/client";
import { WifiData } from "../schemas/schemaWifi.js";
import { verifyUser } from "./authService.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import { createCryptrData, decryptCryptrData } from "../utils/createCryptr.js";

export async function createWifiUser(wifi: WifiData, user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const passwordEncrypted = createCryptrData(wifi.password);
    await wifiRepository.insertWifi({ ...wifi, password: passwordEncrypted}, user);
}

export async function getWifis(user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const wifis = await wifiRepository.getWifisUser(user);
    const wifisDecrypted = returnWifiPassword(wifis);

    return{
        userLogged: user.email,
        wifis: wifisDecrypted
    }
}

function returnWifiPassword(wifis: WifiData[]){
    return wifis.map(wifi => {
        const { password } = wifi;
        const decryptedPassword = decryptCryptrData(password);
        return { ...wifi, password: decryptedPassword };
    })
}

export async function getWifiById(id: number, user: User, session: Session){
    const idUser = session.userId;
    verifyUser(user, idUser);

    const wifi = await wifiRepository.getWifiById(id, user);
    const verify = !wifi || wifi.userId !== idUser || wifi.id !== id;

    if(verify) throw{
        type: "WifiNotFound",
        message: "Wifi not found"
    }

    return {
        ...wifi,
        password: decryptCryptrData(wifi.password)
    }
}

export async function deleteWifiById(id: number, user: User, session: Session){
    const idUser = session.userId;
    verifyUser(user, idUser);

    const wifi = await wifiRepository.getWifiById(id, user);
    const verify = !wifi || wifi.userId !== idUser || wifi.id !== id;

    if(verify) throw{
        type: "WifiNotFound",
        message: "Wifi not found"
    }

    await wifiRepository.deleteWifiById(id);
}
