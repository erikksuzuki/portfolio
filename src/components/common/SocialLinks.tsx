import Link from 'next/link'
import clsx from 'clsx'
import { SocialLink } from '@/app/socialLinkData'

interface SocialLinksProps {
  data: SocialLink[]
  className?: string
  label?: string
}
const SocialLinks = ({ data, className, label }: SocialLinksProps) => {
  return (
    <section className={clsx(className, 'flex flex-col gap-4')}>
      <p className="text-theme-sm">{label}</p>
      <div className="flex flex-row gap-6 items-end">
        {data.map((link: SocialLink) => {
          return (
            <Link key={link.href} target="_blank" href={link.href}>
              {link.icon}
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SocialLinks
