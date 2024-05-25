import { type Locale, locales } from 'src/locales'
import createMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en' satisfies Locale,
  localePrefix: 'never',
})

export default async function nextMiddleWareFunction(req: NextRequest) {
  return nextIntlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
