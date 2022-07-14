import joi from 'joi';

import { User } from "@prisma/client";
export type UserBody = Omit<User, "id" | "createdAt">;

const schemaAuth: joi.ObjectSchema<UserBody> = joi.object({
    email: joi.string().lowercase().email().required(),
    password: joi.string().min(10).required()
})

export default schemaAuth;
