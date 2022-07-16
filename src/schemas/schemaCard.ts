import joi from "joi";

import { Card } from "@prisma/client";
export type CardData = Omit<Card, "id" | "userId" | "isDeleted" | "createdAt" | "updatedAt">;

const regexDate = /^[0-9]{2}\/[0-9]{2}$/;
const regexName = /^[A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ ]+$/;
const regexNumber = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;

const schemaCard: joi.ObjectSchema = joi.object({
    title: joi.string().required(),
    number: joi.string().pattern(regexNumber).required(),
    cardholderName: joi.string().pattern(regexName).required(),
    securityCode: joi.string().length(3).required().trim(),
    expirationDate: joi.string().pattern(regexDate).required(),
    password: joi.string().length(4).required().trim(),
    isVirtual: joi.boolean().required(),
    typeCard: joi.valid("Credit", "Debit", "CreditDebit").required()
});

export default schemaCard;
