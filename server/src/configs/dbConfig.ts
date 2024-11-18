import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  ssl: { rejectUnauthorized: false }
};
