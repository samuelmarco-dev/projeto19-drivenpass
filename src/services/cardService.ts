import { Card, Session, User } from '@prisma/client';
import { CardData } from '../schemas/schemaCard.js';
import { verifyUser } from './authService.js';
import { createCryptrData } from '../utils/createCryptr.js';
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(card: CardData, session: Session, user: User){
    const id = session.userId;
    verifyUser(user, id);

    const cardFound = await cardRepository.existsCard(card, user);
    if(cardFound) throw{
        type: "CardAlreadyExists",
        message: "Card already exists"
    }

    const encryptedPassword = createCryptrData(card.password);
    await cardRepository.inserCard({ ...card, password: encryptedPassword }, user);
}

export async function getCards(user: User, session: Session){
    const id = session.userId;
    verifyUser(user, id);

    const cards = await cardRepository.getCards(user);
    const cardsEncrypted = returnCardsPassword(cards);

    return {
        userLogin: user.email,
        cards: cardsEncrypted
    }
}

function returnCardsPassword(card: Card[]){
    return card.map(card => {
        const { password } = card;
        const decryptedPassword = createCryptrData(password);
        return { ...card, password: decryptedPassword };
    });
}

export async function getCardById(id: number, session: Session, user: User){
    const idUser = session.userId;
    verifyUser(user, idUser);

    const card = await cardRepository.getCardById(id, user);
    const verify = !card || card.userId !== user.id || card.id !== id;

    if(verify) throw{
        type: 'CardNotFound',
        message: 'Card not found'
    }

    const { password } = card;
    const decryptedPassword = createCryptrData(password);

    return { ...card, password: decryptedPassword };
}

export async function deleteCardById(id: number, session: Session, user: User){
    const idUser = session.userId;
    verifyUser(user, idUser);

    const card = await cardRepository.getCardById(id, user);
    const verify = !card || card.userId !== user.id || card.id !== id;

    if(verify) throw{
        type: 'CardNotFound',
        message: 'Card not found'
    }

    await cardRepository.deleteCardById(id);
}
