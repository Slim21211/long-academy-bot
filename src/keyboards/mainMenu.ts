import { Markup } from 'telegraf';
import { VIDEO } from '../media/links';

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
  [Markup.button.url('Видео о компании', VIDEO.ABOUT)],
  [Markup.button.callback('Видео пансионат', 'video_hotel')],
  [Markup.button.callback('Миссия компании', 'mission')],
]);
