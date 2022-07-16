import joi from "joi";

import { Card } from "@prisma/client";
export type CardData = Omit<Card, "id" | "userId" | "isDeleted" | "createdAt" | "updatedAt">;

const schemaCard: joi.ObjectSchema = joi.object({
    title: joi.string().required(),
    number: joi.string().required(),
    cardholderName: joi.string().required(),
    securityCode: joi.string().required(),
    expirationDate: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    typeCard: joi.valid("Credit", "Debit", "CreditDebit").required()
})

export default schemaCard;
