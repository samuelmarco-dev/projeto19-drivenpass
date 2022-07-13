import joi from 'joi';

export interface User{
    email: string;
    password: string;
}

const schemaAuth: joi.ObjectSchema<User> = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default schemaAuth;
