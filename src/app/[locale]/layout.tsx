import type { Metadata } from 'next'
import '@/styles/globals.css'
import clsx from 'clsx'
import {
  Noto_Sans_Thai,
  Noto_Sans_JP,
  Sawarabi_Mincho,
  Ibarra_Real_Nova,
  Poppins,
  Unica_One,
  Space_Grotesk,
  Exo,
  Noto_Emoji,
  Roboto,
  Open_Sans,
  Fira_Code,
} from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { type Locale } from 'src/locales'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'landing' })
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  }
}

export const viewport = {
  initialScale: 1.0,
  userScalable: false,
  width: 'device-width',
  height: 'device-height',
}

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
  weight: ['300', '400', '500', '600', '700'],
})

const iBarraRealNova = Ibarra_Real_Nova({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibarra-real-nova',
  weight: ['400'],
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const notoSansJapanese = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const sawabiMincho = Sawarabi_Mincho({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sawabi-jp',
  weight: ['400'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
})

const exo = Exo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-exo',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const emoji = Noto_Emoji({
  subsets: [],
  display: 'swap',
  variable: '--font-emoji',
  weight: ['400'],
})

const RootLayout = async ({
  params: { locale },
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) => {
  const messages = await getMessages()
  return (
    <html lang="en">
      <body
        className={clsx(
          'bg-[#0A2B3E] text-white',
          firaCode.variable,
          notoSansThai.variable,
          notoSansJapanese.variable,
          sawabiMincho.variable,
          poppins.variable,
          iBarraRealNova.variable,
          spaceGrotesk.variable,
          exo.variable,
          emoji.variable,
          roboto.variable,
          openSans.variable,
          'font-space'
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <main
            className={clsx(
              { 'font-exo': locale === 'en' },
              { 'font-noto-jp': locale === 'jp' }
            )}
          >
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
