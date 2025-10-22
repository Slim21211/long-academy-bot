import { Markup } from 'telegraf';
import { PDF_CATEGORIES } from '../media/links';
import { PAGE_SIZE } from '../config';

export function generatePaginatedKeyboard(categoryId: string, page = 0) {
  const category = PDF_CATEGORIES.find((cat) => cat.id === categoryId);
  const items = category?.documents || [];

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  const buttons = items
    .slice(start, end)
    .map((item) => [
      Markup.button.callback(item.name, `${categoryId}_${item.id}`),
    ]);

  const navigationButtons = [];
  if (page > 0) {
    navigationButtons.push(
      Markup.button.callback('⬅️ Назад', `${categoryId}_page_${page - 1}`)
    );
  }
  if (page < totalPages - 1) {
    navigationButtons.push(
      Markup.button.callback('➡️ Далее', `${categoryId}_page_${page + 1}`)
    );
  }
  if (navigationButtons.length > 0) {
    buttons.push(navigationButtons);
  }

  return Markup.inlineKeyboard(buttons);
}
