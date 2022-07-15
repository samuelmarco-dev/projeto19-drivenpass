import { Request, Response } from "express";

import { Session } from "@prisma/client";
import { CredentialData } from "../schemas/schemaCredencial.js";
import * as userRepository from "../repositories/usersRepository.js";
import * as credentialService from "../services/credentialService.js";

export async function createCredentialUser(req: Request, res: Response){
    const { title, url, username, password }: CredentialData = req.body;
    const session: Session = res.locals.session;

    if(!title || !url || !username || !password) return res.status(400).send("Missing credentials");
    const user = await userRepository.findUserById(session.userId);

    await credentialService.createCredential({ title, url, username, password }, user, session);
    res.sendStatus(201);
}

export async function getCredential(req: Request, res: Response){
    const session: Session = res.locals.session;
    const user = await userRepository.findUserById(session.userId);

    const credentials = await credentialService.getCredentials(user, session);
    res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response){
    const { id } = req.params;
    const session: Session = res.locals.session;

    if(!id) return res.status(400).send("Missing id");
    const user = await userRepository.findUserById(session.userId);

    const credential = await credentialService.getCredentialById(Number(id), user, session);
    res.status(200).send(credential);
}

export async function deleteCredentialById(req: Request, res: Response){
    const { id } = req.params;
    const session: Session = res.locals.session;

    if(!id) return res.status(400).send("Missing id");
    const user = await userRepository.findUserById(session.userId);

    await credentialService.deleteCredentialById(Number(id), user, session);
    res.sendStatus(200);
}
