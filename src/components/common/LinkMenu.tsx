'use client'

import Link from 'next/link'
import clsx from 'clsx'
import IconChevonDown from '@/assets/icons/common/IconChevonDown'
import { useState } from 'react'

interface ExperienceLink {
  label: string
  href: string
}

const links: ExperienceLink[] = [
  {
    label: 'Website',
    href: 'https://blockscope.co',
  },
  {
    label: 'Y Combinator',
    href: 'https://www.ycombinator.com/companies/blockscope',
  },

  {
    label: 'Crunchbase',
    href: 'https://www.crunchbase.com/organization/blockscope',
  },
]

const LinkMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleClose() {
    if (menuOpen) {
      setMenuOpen(false)
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleClose)
  }

  return (
    <nav className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-black text-theme-sm rounded-md shadow-lg px-3 py-2 flex gap-2 items-center"
      >
        Links <IconChevonDown className="w-4 h-4" />
      </button>
      <ul
        className={clsx(
          'absolute top-[42px] rounded-md overflow-hidden right-0',
          { hidden: !menuOpen }
        )}
      >
        {links.map((link: ExperienceLink, index: number) => (
          <Link key={link.label} href={link.href}>
            <li
              className={clsx(
                'px-3 py-2 bg-black whitespace-nowrap text-theme-sm',
                {
                  'border-b border-[rgba(255,255,255,0.3)]':
                    index !== links.length - 1,
                }
              )}
            >
              {link.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default LinkMenu
