import { Markup } from 'telegraf';

export const standardsMenuKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Стандартные операционные процедуры (СОП)', 'reminders_button')],
  [Markup.button.callback('Стандарты работы сиделки и санитарки', 'nurse_button')],
])
