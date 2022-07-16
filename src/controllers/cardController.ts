import { Request, Response } from "express";

import { CardData } from "../schemas/schemaCard.js";
import * as cardService from "../services/cardService.js";
import * as userRepository from "../repositories/usersRepository.js";

export async function createCardUser(req: Request, res: Response){
    const {
        title, number, cardholderName, securityCode, expirationDate,
        password, isVirtual, typeCard
    }: CardData = req.body;
    const session = res.locals.session;

    const verifyBody = !title || !number || !cardholderName || !securityCode ||
    !expirationDate || !password || !isVirtual || !typeCard;

    if(verifyBody || typeof(isVirtual) !== 'boolean') return res.status(400).send("Missing data");
    const user = await userRepository.findUserById(session.userId);

    await cardService.createCard({ title, number, cardholderName, securityCode,
        expirationDate, password, isVirtual, typeCard }, session, user);
    res.sendStatus(201);
}

export async function getCards(req: Request, res: Response){
    const session = res.locals.session;
    const user = await userRepository.findUserById(session.userId);

    const cards = await cardService.getCards(user, session);
    res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response){
    const { id } = req.params;
    const session = res.locals.session;

    if(!id) return res.status(400).send("Missing id");
    const user = await userRepository.findUserById(session.userId);

    const card = await cardService.getCardById(Number(id), session, user);
    res.status(200).send(card);
}

export async function deleteCardById(req: Request, res: Response){
    const { id } = req.params;
    const session = res.locals.session;

    if(!id) return res.status(400).send("Missing id");
    const user = await userRepository.findUserById(session.userId);

    await cardService.deleteCardById(Number(id), session, user);
    res.sendStatus(200);
}
