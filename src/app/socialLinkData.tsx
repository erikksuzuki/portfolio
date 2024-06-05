import IconCv from '@/assets/icons/common/IconCv'
import IconGithub from '@/assets/icons/common/IconGithub'
import IconInstagram from '@/assets/icons/common/IconInstagram'
import IconLinkedin from '@/assets/icons/common/IconLinkedin'
import IconTumblr from '@/assets/icons/common/IconTumblr'
import { ReactNode } from 'react'

export interface SocialLink {
  name: string
  href: string
  icon: ReactNode
}

export const socialLinkData: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/erikksuzuki/portfolio',
    icon: <IconGithub className="w-6 h-6" />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/erikksuzuki',
    icon: <IconInstagram className="w-6 h-6" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eric-suzuki-04380449/',
    icon: <IconLinkedin className="w-6 h-6" />,
  },
  {
    name: 'Tumblr',
    href: 'https://emptyblueprints-blog.tumblr.com',
    icon: <IconTumblr className="w-6 h-6" />,
  },
  {
    name: 'Resume',
    href: 'https://archived.alkemyst.app/eric_suzuki_cv_2024_with_portfolio.pdf',
    icon: <IconCv className="w-6 h-6" />,
  },
]
