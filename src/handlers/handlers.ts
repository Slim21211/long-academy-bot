import { Telegraf, Context, Input } from 'telegraf';
import {
  BUTTONS,
  mainMenuKeyboard,
  aboutInlineKeyboard,
  returnInlineButton,
} from '../keyboards/mainMenu';
import { PDF, PDF_CATEGORIES, PHOTO, VIDEO } from '../media/links';
import { standardsMenuKeyboard } from '../keyboards/standards';
import { sendPdfAndReturn, showPaginatedList } from './helpers';
import {
  GREETING_TEXT,
  COMPANY_INFO_TEXT,
  SELECT_SECTION_TEXT,
  RETURN_TEXT,
} from '../config';
import { generatePaginatedKeyboard } from '../pagination/paginatedKeyboard';

const { MISSION } = PDF;

// ✅ ДИНАМИЧЕСКИЙ REGEX из PDF_CATEGORIES
const CATEGORIES_REGEX = PDF_CATEGORIES.map((cat) => cat.id).join('|');
const BUTTON_REGEX = new RegExp(`^(${CATEGORIES_REGEX})_button$`);

export function setupHandlers(bot: Telegraf<Context>) {
  // Основные команды
  bot.start((ctx) => {
    ctx.reply(GREETING_TEXT, mainMenuKeyboard);
  });

  bot.hears(BUTTONS.ABOUT, (ctx) => {
    ctx.reply(COMPANY_INFO_TEXT, aboutInlineKeyboard);
  });

  bot.hears(BUTTONS.STANDARDS, async (ctx) => {
    await ctx.reply(SELECT_SECTION_TEXT, standardsMenuKeyboard);
  });

  bot.hears(BUTTONS.FRIENDS, async (ctx) => {
    await ctx.replyWithPhoto(Input.fromURL(PHOTO.FRIENDS));
    await ctx.reply(RETURN_TEXT, returnInlineButton);
  });

  // Обработчики inline кнопок
  bot.action('video_about_company', async (ctx) => {
    ctx.answerCbQuery('Отправка файла..');
    await ctx.deleteMessage();
    await ctx.replyWithVideo(Input.fromURL(VIDEO.ABOUT));
    await ctx.reply(RETURN_TEXT, returnInlineButton);
  });

  bot.action('mission', async (ctx) => {
    ctx.answerCbQuery('Отправка файла..');
    await ctx.deleteMessage();
    await ctx.replyWithDocument(Input.fromURL(MISSION));
    await ctx.reply(RETURN_TEXT, returnInlineButton);
  });

  bot.action('return_button', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await ctx.reply('Выберите раздел:', mainMenuKeyboard);
  });

  // ✅ УНИВЕРСАЛЬНЫЙ обработчик для ВСЕХ кнопок категорий
  bot.action(BUTTON_REGEX, async (ctx) => {
    const categoryId = ctx.match![1];
    await showPaginatedList(ctx, categoryId);
  });

  // ✅ УНИВЕРСАЛЬНАЯ пагинация
  bot.action(/^(\w+)_page_(\d+)$/, async (ctx) => {
    const categoryId = ctx.match![1];
    const page = parseInt(ctx.match![2], 10);

    await ctx.answerCbQuery();
    await ctx.editMessageReplyMarkup(
      generatePaginatedKeyboard(categoryId, page).reply_markup
    );
  });

  // ✅ УНИВЕРСАЛЬНЫЙ выбор PDF
  bot.action(/^(\w+)_(\d+)$/, async (ctx) => {
    await ctx.deleteMessage();
    const categoryId = ctx.match![1];
    const docId = parseInt(ctx.match![2], 10);
    await sendPdfAndReturn(ctx, categoryId, docId);
  });
}
