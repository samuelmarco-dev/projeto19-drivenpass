import { Session, User } from "@prisma/client";
import { WifiData } from "../schemas/schemaWifi.js";
import { verifyUser } from "./authService.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import { createCryptrData } from "../utils/createCryptr.js";

export async function createWifiUser(wifi: WifiData, user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const passwordEncrypted = createCryptrData(wifi.password);
    await wifiRepository.insertWifi({ ...wifi, password: passwordEncrypted}, user);
}

export async function getWifis(user: User, session: Session){

}

export async function getWifiById(){

}

export async function deleteWifiById(){

}
