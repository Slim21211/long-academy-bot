import { Markup } from 'telegraf';
import { PDF_CATEGORIES } from '../media/links';

export const standardsMenuKeyboard = Markup.inlineKeyboard(
  PDF_CATEGORIES.map((category) => [
    Markup.button.callback(category.buttonText, `${category.id}_button`),
  ])
);
