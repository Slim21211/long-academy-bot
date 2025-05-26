import { Telegraf } from 'telegraf';
import { setupHandlers } from './handlers/handlers';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
const mode = process.env.MODE || 'production';

if (!token) {
  throw new Error('TOKEN not found in environment variables');
}

export const bot = new Telegraf(token);
setupHandlers(bot);

if (mode === 'local') {
  bot.launch();
  console.log('Бот запущен в режиме polling');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
