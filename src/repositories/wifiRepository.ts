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
