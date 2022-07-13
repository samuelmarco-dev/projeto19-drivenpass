import joi from 'joi';

import { User } from '../repositories/usersRepository.js';
export type UserBody = Omit<User, "id">

const schemaAuth: joi.ObjectSchema<UserBody> = joi.object({
    email: joi.string().lowercase().email().required(),
    password: joi.string().min(10).required()
})

export default schemaAuth;
