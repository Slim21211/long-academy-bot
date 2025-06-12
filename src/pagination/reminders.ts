import { Markup } from 'telegraf';
import { PDF } from '../media/links';

const PAGE_SIZE = 6;
const { REMINDERS } = PDF

export function generateRemindersKeyboard(page = 0) {
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const totalPages = Math.ceil(REMINDERS.length / PAGE_SIZE);

  const buttons = REMINDERS.slice(start, end).map((item) =>
    [Markup.button.callback(item.name, `reminder_${item.id}`)]
  );

  const navigationButtons = [];

  if (page > 0) {
    navigationButtons.push(Markup.button.callback('⬅️ Назад', `reminder_page_${page - 1}`));
  }

  if (page < totalPages - 1) {
    navigationButtons.push(Markup.button.callback('➡️ Далее', `reminder_page_${page + 1}`));
  }

  if (navigationButtons.length > 0) {
    buttons.push(navigationButtons);
  }

  return Markup.inlineKeyboard(buttons);
}
