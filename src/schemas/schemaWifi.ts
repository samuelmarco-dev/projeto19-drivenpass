import joi from 'joi';

import { Wifi } from '@prisma/client';
export type WifiData = Omit<Wifi, 'id' | 'userId' | 'isDeleted' | 'createdAt' | 'updatedAt'>;

const schemaWifi = joi.object({
    title: joi.string().required(),
    network: joi.string().required(),
    password: joi.string().required()
});

export default schemaWifi;
