import { Markup } from 'telegraf';

export const standardsMenuKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Памятки по уходу за подопечными', 'reminders_button')],
  [Markup.button.callback('Стандарты работы сиделки и санитарки', 'nurse_button')],
])
