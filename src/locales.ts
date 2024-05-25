export const locales = ['en', 'th', 'jp'] as const
export type Locale = (typeof locales)[number]
