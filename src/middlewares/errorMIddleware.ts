import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default async function handleError(err, req: Request, res: Response, next: NextFunction){
    if(err){
        console.log(chalk.red('error: ', err));
        if(unauthorized(err)) return res.status(401).send('Unauthorized');
    }

    res.sendStatus(500);
}

function unauthorized(err){
    const verification = err.type === ('InvalidToken' || 'SessionError' || 'InvalidPassword');
    return verification;
}
