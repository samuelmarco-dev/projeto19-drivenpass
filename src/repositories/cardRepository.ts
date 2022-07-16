import dayjs from 'dayjs';

import prisma from '../config/database.js';
import { User } from '@prisma/client';
import { CardData } from './../schemas/schemaCard.js';

export async function existsCard(card: CardData, user: User){
    return await prisma.card.findFirst({
        where: {
            number: card.number,
            title: card.title,
            userId: user.id
        }
    });
}

export async function inserCard(card: CardData, user: User){
    await prisma.card.create({
        data: {
            ...card,
            userId: user.id,
            isDeleted: false,
            createdAt: dayjs().format(),
            updatedAt: dayjs().format()
        }
    });
}

export async function getCards(user: User){
    return await prisma.card.findMany({
        where: {
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function getCardById(id: number, user: User){
    return await prisma.card.findFirst({
        where: {
            id,
            userId: user.id,
            isDeleted: false
        }
    })
}

export async function deleteCardById(id){
    await prisma.card.update({
        where: { id },
        data: {
            isDeleted: true,
            updatedAt: dayjs().format()
        }
    });
}
