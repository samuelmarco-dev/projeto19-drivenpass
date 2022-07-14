import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default async function handleError(err, req: Request, res: Response, next: NextFunction){
    if(err){
        console.log(chalk.red('error: ', err));
        if(err.type === 'InvalidPassword') return res.sendStatus(401);
    }

    res.sendStatus(500);
}
