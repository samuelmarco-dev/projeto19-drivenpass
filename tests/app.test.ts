import supertest from "supertest";

import app from "../src/index.js";
import prisma from "../src/config/database.js";

describe("POST /users", ()=> {
    it('create new user', async()=> {
        const response = await supertest(app).post('/sign-up').send({
            email: `${Math.random()}@gmail.com`,
            password: '0123456789'
        });
        expect(response.status).toEqual(201);
    });

    it('create new user with missing data', async()=> {
        const response = await supertest(app).post('/sign-up').send({
            email: '', password: ''
        });
        expect(response.status).toEqual(422);
    });

    it('create new user with email upperCase', async()=> {
        const response = await supertest(app).post('/sign-up').send({
            email: 'EMAILEMAIL@gmail.com', password: '0123456789'
        });
        expect(response.status).toEqual(422);
    });

    it('create new user with email upperCase', async()=> {
        const response = await supertest(app).post('/sign-up').send({
            email: 'admin@gmail.com', password: '0123456789'
        });
        expect(response.status).toEqual(409);
    });
});

afterAll(async()=> {
    await prisma.$disconnect();
});
