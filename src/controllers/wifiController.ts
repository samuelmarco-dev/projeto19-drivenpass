import { Request, Response } from 'express';

import { Session } from '@prisma/client';
import { WifiData } from '../schemas/schemaWifi.js';
import * as wifiService from '../services/wifiService.js';
import * as userRepository from '../repositories/usersRepository.js';

export async function createWifiUser(req: Request, res: Response){
    const { title, network, password }: WifiData = req.body;
    const session: Session = res.locals.session;

    if(!title || !network || !password) return res.status(400).send('Missing data');
    const user = await userRepository.findUserById(session.userId);

    await wifiService.createWifiUser({ title, network, password }, user, session);
    res.sendStatus(201);
}

export async function getWifis(req: Request, res: Response){
    const session: Session = res.locals.session;
    const user = await userRepository.findUserById(session.userId);

    const wifis = await wifiService.getWifis(user, session);
    res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response){
    const { id } = req.params;
    const session: Session = res.locals.session;
    const user = await userRepository.findUserById(session.userId);

    const wifi = await wifiService.getWifiById(Number(id), user, session);
    res.status(200).send(wifi);
}

export async function deleteWifiById(req: Request, res: Response){
    const { id } = req.params;
    const session: Session = res.locals.session;
    const user = await userRepository.findUserById(session.userId);

    await wifiService.deleteWifiById(Number(id), user, session);
    res.sendStatus(200);
}
