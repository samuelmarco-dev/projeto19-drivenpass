import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export async function createCardUser(req: Request, res: Response){
    res.sendStatus(201);
}

export async function getCards(req: Request, res: Response){
    res.status(200).send('');
}

export async function getCardById(req: Request, res: Response){
    res.status(200).send('');
}

export async function deleteCardById(req: Request, res: Response){
    res.sendStatus(200);
}
