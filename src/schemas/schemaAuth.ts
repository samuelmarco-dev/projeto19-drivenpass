import joi from 'joi';

import { User } from '../repositories/authRepository.js';
export type UserBody = Omit<User, "id">

const schemaAuth: joi.ObjectSchema<UserBody> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default schemaAuth;
