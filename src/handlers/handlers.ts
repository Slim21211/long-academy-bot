import { Telegraf, Context, Input } from 'telegraf';
import {
  BUTTONS,
  mainMenuKeyboard,
  aboutInlineKeyboard
} from '../keyboards/mainMenu';
import { PDF, PHOTO, VIDEO } from '../media/links';

const greetingText = 'Добро пожаловать в обучающий бот Академии Долголетия! 🎉 Мы рады видеть Вас здесь. Этот бот создан, чтобы помочь Вам развивать свои навыки и получать полезную информацию для работы в пансионатах. Ваш опыт и знания — это залог комфорта и счастья наших постояльцев!😊';

export function setupHandlers(bot: Telegraf<Context>) {
  bot.start((ctx) => {
    ctx.reply(greetingText, mainMenuKeyboard);
  });

  bot.hears(BUTTONS.ABOUT, (ctx) => {
    ctx.reply('Посмотрите медиаматериалы, чтобы больше узнать о нашей компании', aboutInlineKeyboard);
  });

  bot.hears(BUTTONS.STANDARDS, (ctx) => {
    ctx.reply('Наши стандарты работы с постояльцами:');
  });

  bot.hears(BUTTONS.FRIENDS, async (ctx) => {
    await ctx.replyWithPhoto(Input.fromURL(PHOTO.FRIENDS));
  });

  bot.action('video_hotel', async (ctx) => {
    ctx.answerCbQuery('Отправка файла..');
    await ctx.replyWithVideo(Input.fromURL(VIDEO.HOTEL));
  });

  bot.action('mission', async (ctx) => {
    ctx.answerCbQuery('Отправка файла..');
    await ctx.replyWithDocument(Input.fromURL(PDF.MISSION));
  });
}
