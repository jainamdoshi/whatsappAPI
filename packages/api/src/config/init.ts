import dotenv from 'dotenv';

dotenv.config();

export const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || '';
export const WHATSAPP_USER_ACCESS_TOKEN = process.env.WHATSAPP_USER_ACCESS_TOKEN || '';

export const PORT = parseInt(process.env.PORT as string) || 8080;

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT as string) || 5432;
export const DB_DATABASE = process.env.DB_DATABASE || 'postgres';
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
