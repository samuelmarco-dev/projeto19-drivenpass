import joi from "joi";
import { Credential } from "@prisma/client";

export type CredentialData = Omit<Credential, "id" | "userId" | "isDeleted" | "createdAt" | "updatedAt">

const schemaCredential: joi.ObjectSchema<CredentialData> = joi.object({
    title: joi.string().required(),
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required()
})

export default schemaCredential;
