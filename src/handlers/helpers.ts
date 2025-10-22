import { Context } from 'telegraf';
import { generatePaginatedKeyboard } from '../pagination/paginatedKeyboard';
import { returnInlineButton } from '../keyboards/mainMenu';
import { PDF_CATEGORIES } from '../media/links';
import { RETURN_TEXT } from '../config';

// ✅ ФУНКЦИЯ ЭСКЕЙПИНГА для MarkdownV2
function escapeMarkdownV2(text: string): string {
  return text.replace(/([_*[\]()~`>#+=|{}.!-])/g, '\\$1');
}

export async function sendPdfAndReturn(
  ctx: Context,
  categoryId: string,
  docId: number
) {
  const category = PDF_CATEGORIES.find((cat) => cat.id === categoryId);
  const item = category?.documents.find((doc) => doc.id === docId);

  if (item) {
    await ctx.answerCbQuery('Отправка файла...');
    await ctx.replyWithDocument({
      url: item.url,
      filename: `${item.name}.pdf`,
    });
    await ctx.reply(RETURN_TEXT, returnInlineButton);
  } else {
    await ctx.answerCbQuery('Файл не найден');
  }
}

export async function showPaginatedList(ctx: Context, categoryId: string) {
  const category = PDF_CATEGORIES.find((cat) => cat.id === categoryId);
  if (!category) {
    return ctx.answerCbQuery('Категория не найдена');
  }

  await ctx.answerCbQuery();
  await ctx.deleteMessage();

  // ✅ ЭСКЕЙПИНГ заголовка!
  const escapedTitle = escapeMarkdownV2(category.title);

  await ctx.reply(`*__${escapedTitle}__*\n\nВыберите документ:`, {
    parse_mode: 'MarkdownV2',
    reply_markup: generatePaginatedKeyboard(categoryId, 0).reply_markup,
  });
}
