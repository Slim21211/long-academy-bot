import { Markup } from 'telegraf';

export const BUTTONS = {
  ABOUT: '👋 О Компании',
  STANDARDS: '📋 Стандарты работы',
  FRIENDS: '👥 Приведи друга',
};

export const mainMenuKeyboard = Markup.keyboard([
  [BUTTONS.ABOUT, BUTTONS.STANDARDS],
  [BUTTONS.FRIENDS],
]).resize();

export const aboutInlineKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Видео о Компании', 'video_about_company')],
  [Markup.button.callback('Миссия и ценности Компании', 'mission')],
]);

export const returnInlineButton = Markup.inlineKeyboard([
  [Markup.button.callback('<< Назад', 'return_button')]
])
