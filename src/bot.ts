import { Telegraf } from 'telegraf';
import { setupHandlers } from './handlers/handlers';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('TOKEN not found in environment variables');
}

export const bot = new Telegraf(token);
setupHandlers(bot);
