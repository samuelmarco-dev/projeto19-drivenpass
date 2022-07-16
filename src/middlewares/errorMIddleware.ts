import { NextFunction, Request, Response } from "express";

export default async function handleError(err, req: Request, res: Response, next: NextFunction){
    if(err){
        if(unauthorized(err.type)) return res.status(401).send(err.message);
        if(err.type === 'UserIdNotMatch') return res.status(400).send(err.message);
        if(notFound(err.type)) return res.status(404).send(err.message);
        if(conflict(err.type)) return res.status(409).send(err.message);
    }

    res.sendStatus(500);
}

function unauthorized(err: string){
    if(err === 'InvalidToken') return true;
    if(err === 'SessionError') return true;
    if(err === 'InvalidPassword') return true;
    if(err === 'TokenExpired') return true;

    return false;
}

function notFound(err: string){
    if(err === 'UserNotFound') return true;
    if(err === 'CredentialNotFound') return true;
    if(err === 'SecureNoteNotFound') return true;
    if(err === 'WifiNotFound') return true;
    if(err === 'CardNotFound') return true;

    return false;
}

function conflict(err: string){
    if(err === 'CredentialAlreadyExists') return true;
    if(err === 'SecureNoteAlreadyExists') return true;
    if(err === 'CardAlreadyExists') return true;

    return false;
}
