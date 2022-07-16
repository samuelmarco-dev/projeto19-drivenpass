import dayjs from "dayjs";

import prisma from "../config/database.js";
import { User } from "@prisma/client";
import { WifiData } from "../schemas/schemaWifi.js";

export async function insertWifi(wifi: WifiData, user: User){
    await prisma.wifi.create({
        data: {
            ...wifi,
            userId: user.id,
            isDeleted: false,
            createdAt: dayjs().format(),
            updatedAt: dayjs().format()
        }
    })
}

export async function getWifisUser(user: User){
    return await prisma.wifi.findMany({
        where: {
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function getWifiById(id: number, user: User){
    await prisma.wifi.findFirst({
        where: {
            id,
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function deleteWifiById(id: number){
    await prisma.wifi.update({
        where: { id },
        data: {
            isDeleted: true,
            updatedAt: dayjs().format()
        }
    })
}
