'use client'

import Link from 'next/link'
import clsx from 'clsx'
import IconChevonDown from '@/assets/icons/common/IconChevonDown'
import { useState } from 'react'
import Image from 'next/image'

export interface ExperienceLink {
  label: string
  href: string
  iconSrc?: string
}
interface LinkMenuProps {
  experienceLinks?: ExperienceLink[]
}
const LinkMenu = ({ experienceLinks }: LinkMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  function handleClose() {
    if (menuOpen) setMenuOpen(false)
  }
  if (typeof window !== 'undefined')
    window.addEventListener('scroll', handleClose)
  return (
    <nav className="relative">
      {experienceLinks && (
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-black text-theme-sm rounded-md shadow-lg px-3 py-2 flex gap-2 items-center"
          >
            Links <IconChevonDown className="w-4 h-4" />
          </button>
          <ul
            onMouseLeave={() => handleClose()}
            className={clsx(
              'absolute top-[42px] rounded-md overflow-hidden right-0',
              { hidden: !menuOpen }
            )}
          >
            {experienceLinks.map((link: ExperienceLink, index: number) => (
              <Link key={link.label} href={link.href} target="_blank">
                <li
                  className={clsx(
                    'flex flex-row items-center gap-2 px-3 py-2 bg-black whitespace-nowrap text-theme-sm',
                    {
                      'border-b border-[rgba(255,255,255,0.3)]':
                        index !== experienceLinks.length - 1,
                    }
                  )}
                >
                  <div className="w-4 h-4 min-w-4 min-h-4 rounded-sm overflow-hidden">
                    {link.iconSrc && (
                      <Image
                        src={link.iconSrc}
                        alt={`${link.label} icon`}
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                  {link.label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default LinkMenu
