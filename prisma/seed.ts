import bcrypt from 'bcrypt';

import prisma from '../src/config/database.js';

async function main(){
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash('123456', salt);

    await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: { },
        create: {
            email: 'admin@gmail.com',
            password: passwordEncrypted,
        }
    });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async()=> await prisma.$disconnect());
