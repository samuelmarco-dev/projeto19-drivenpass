import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

const serviceErrorToStatusCode = {
    unauthorized: 401,
    conflict: 409,
};

export default async function handleError(err, req: Request, res: Response, next: NextFunction){
    if(err){
        console.log(chalk.red('error: ', err));
        return res.status(serviceErrorToStatusCode[err.type]).send(err.message);
    }

    res.sendStatus(500);
}
