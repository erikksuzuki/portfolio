'use client'

import Link from 'next/link'
import clsx from 'clsx'
import IconChevonDown from '@/assets/icons/common/IconChevonDown'

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
  return (
    <div>
      <div className="bg-black text-theme-sm rounded-md shadow-lg px-3 py-2 flex gap-2 items-center">
        Links <IconChevonDown className="w-4 h-4" />
      </div>

      {links.map((link: ExperienceLink, index: number) => (
        <Link key={link.label} href={link.href}>
          <div
            className={clsx('px-3 py-2', {
              'border-b border-[rgba(255,255,255,0.3)]':
                index !== links.length - 1,
            })}
          >
            {link.label}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default LinkMenu
