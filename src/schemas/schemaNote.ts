import joi from "joi";

import { SecureNote } from "@prisma/client";
export type NoteBody = Omit<SecureNote, "id" | "userId" | "isDeleted" | "createdAt" | "updatedAt">

const schemaNote: joi.ObjectSchema<NoteBody> = joi.object({
    title: joi.string().max(50).required(),
    content: joi.string().max(1000).required()
});

export default schemaNote;
