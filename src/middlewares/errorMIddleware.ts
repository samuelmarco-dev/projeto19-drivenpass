import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default async function handleError(err, req: Request, res: Response, next: NextFunction){
    if(err){
        console.log(chalk.red('error: ', err));
        if(unauthorized(err.type)) return res.status(401).send('Unauthorized');
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
