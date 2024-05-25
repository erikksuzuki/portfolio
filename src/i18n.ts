'server-only'

import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { type AbstractIntlMessages } from 'next-intl'
import { locales, type Locale } from 'src/locales'

const messageImports = {
  en: () => import('src/app/translations/en.json'),
  th: () => import('src/app/translations/th.json'),
  jp: () => import('src/app/translations/jp.json'),
} as const satisfies Record<
  Locale,
  () => Promise<{ default: AbstractIntlMessages }>
>

export function isValidLocale(locale: unknown): locale is Locale {
  return locales.some((l) => l === locale)
}

export default getRequestConfig(async (params) => {
  const baseLocale = new Intl.Locale(params.locale).baseName
  if (!isValidLocale(baseLocale)) notFound()

  const messages = (await messageImports[baseLocale]()).default
  return {
    messages,
  }
})
