import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const development = {
    connectionString: process.env.DATABASE_URL
}
const production = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const connection: pg.Pool = new Pool(
    process.env.MODE === "PROD" ? production : development
);

export default connection;
