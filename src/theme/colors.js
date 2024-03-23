import { storeConfigVar } from '@core/services/graphql/cache';

const pwaConfig = storeConfigVar();

export const PRIMARY = '#304ffe';
export const SECONDARY = '#374151';

export const FONT_COLOR = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.font_color ? pwaConfig.pwa.font_color : '#000000';
export const BACKGROUND_COLOR = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.background_color ? pwaConfig.pwa.background_color : '#FFFFFF';

export const BADGE_COLOR = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.button_background_color ? pwaConfig.pwa.button_background_color : '#000000';

export const GRAY_PRIMARY = '#DEDEDE';
export const GRAY_SECONDARY = '#B4B4B4';
export const GRAY_THIRD = '#6E6E6E';
export const GRAY_LIGHT = '#F8F8F8';
export const WHITE = '#FFFFFF';
export const WHITE_IMPORTANT = '#FFFFFF !important';

export const ERROR_COLOR = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.error_color ? pwaConfig.pwa.error_color : '#dc2626';
export const WARNING_COLOR = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.warning_msg_color ? pwaConfig.pwa.warning_msg_color : '#f59e0b';
export const SUCCESS_COLOR = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.success_msg_color ? pwaConfig.pwa.success_msg_color : '#00cc35';
export const RED = '#dc2626';
export const ORANGE = '#f59e0b';
export const GREEN = '#00cc35';
export const BLACK = '#000000';
