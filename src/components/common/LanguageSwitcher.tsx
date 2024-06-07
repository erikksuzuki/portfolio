'use client'

import clsx from 'clsx'

import flag_jp from '@/assets/languages/JP.png'
import flag_en from '@/assets/languages/EN.webp'

import { type Locale } from 'src/locales'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import Image from 'next/image'
import IconChevonDown from '@/assets/icons/common/IconChevonDown'
import IconLanguage from '@/assets/icons/common/IconLanguage'

const data: any = {
  en: { label: 'English', src: flag_en.src },
  jp: { label: 'Japanese', src: flag_jp.src },
}

const LanguagePicker = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  function handleClose() {
    if (menuOpen) setMenuOpen(false)
  }
  if (typeof window !== 'undefined')
    window.addEventListener('scroll', handleClose)
  function handleLocaleChange(newLocale: Locale): void {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <nav className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="group border border-[rgba(255,255,255,0.2)] text-theme-sm rounded-md shadow-lg px-3 py-2 flex gap-2 items-center"
      >
        <IconLanguage className="w-5 h-5 opacity-[0.8] group-hover:opacity-[1]" />{' '}
        <IconChevonDown className="w-3 h-3" />
      </button>
      <ul
        onMouseLeave={() => handleClose()}
        className={clsx(
          'absolute z-[999999] top-[42px] rounded-md overflow-hidden right-0 shadow-lg bg-[#070707]',
          { hidden: !menuOpen }
        )}
      >
        {Object.keys(data).map((locale: any, index: number) => (
          <li
            key={data[locale].label}
            onClick={() => handleLocaleChange(locale)}
            className={clsx(
              'px-3 py-2 flex gap-2 items-center cursor-pointer text-theme-sm',
              {
                'border-b border-[rgba(255,255,255,0.3)]':
                  index !== Object.keys(data).length - 1,
              }
            )}
          >
            <Image
              src={data[locale].src}
              alt="Language"
              width={18}
              height={18}
              className="max-h-[18px] max-w-[18px] rounded-full border border-[rgba(0,0,0,0.5)]"
            />{' '}
            {data[locale].label}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LanguagePicker
