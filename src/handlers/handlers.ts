import { Telegraf, Context, Input } from 'telegraf';
import {
  BUTTONS,
  mainMenuKeyboard,
  aboutInlineKeyboard,
  returnInlineButton
} from '../keyboards/mainMenu';
import { PDF, PHOTO, VIDEO } from '../media/links';
import { standardsMenuKeyboard } from '../keyboards/standards';
import { generateRemindersKeyboard } from '../pagination/pagination';

const greetingText = 'Добро пожаловать в обучающий бот Академии Долголетия! 🎉 Мы рады видеть Вас здесь. Этот бот создан, чтобы помочь Вам развивать свои навыки и получать полезную информацию для работы в пансионатах. Ваш опыт и знания — это залог комфорта и счастья наших постояльцев!😊';

const { REMINDERS } = PDF;

export function setupHandlers(bot: Telegraf<Context>) {
  bot.start((ctx) => {
    ctx.reply(greetingText, mainMenuKeyboard);
  });

  bot.hears(BUTTONS.ABOUT, (ctx) => {
    ctx.reply('Посмотрите медиаматериалы, чтобы больше узнать о нашей компании', aboutInlineKeyboard);
  });

  bot.hears(BUTTONS.STANDARDS, async (ctx) => {
    await ctx.reply('Выберите интересующий раздел:', standardsMenuKeyboard);
  });

  bot.hears(BUTTONS.FRIENDS, async (ctx) => {
    await ctx.replyWithPhoto(Input.fromURL(PHOTO.FRIENDS));
     ctx.reply('Вернуться в главное меню меню', returnInlineButton)
  });

  bot.action('video_about_company', async (ctx) => {
    ctx.answerCbQuery('Отправка файла..');
    await ctx.replyWithVideo(Input.fromURL(VIDEO.ABOUT));
  });

  bot.action('mission', async (ctx) => {
    ctx.answerCbQuery('Отправка файла..');
    await ctx.replyWithDocument(Input.fromURL(PDF.MISSION));
    await ctx.reply('Вернуться в главное меню меню', returnInlineButton)
  });

  bot.action('return_button', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('Выберите раздел:', mainMenuKeyboard);
  });

  bot.action('reminders_button', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Выберите нужную памятку:', generateRemindersKeyboard(0));
});

bot.action(/^reminder_page_(\d+)$/, async (ctx) => {
  const page = parseInt(ctx.match[1], 10);
  await ctx.answerCbQuery();
  await ctx.editMessageReplyMarkup(generateRemindersKeyboard(page).reply_markup);
});

bot.action(/^reminder_(\d+)$/, async (ctx) => {
  const id = parseInt(ctx.match[1], 10);
  const reminder = REMINDERS.find((r) => r.id === id);

  if (reminder) {
    await ctx.answerCbQuery('Отправка памятки...');
    await ctx.replyWithDocument({ url: reminder.url, filename: reminder.name + '.pdf' });
    await ctx.reply('Вернуться в главное меню меню', returnInlineButton)
  } else {
    await ctx.answerCbQuery('Памятка не найдена');
  }
});
}
