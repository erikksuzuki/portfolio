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
    href: 'https://github.com/erikksuzuki/portfolio',
    icon: <IconInstagram className="w-6 h-6" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://github.com/erikksuzuki/portfolio',
    icon: <IconLinkedin className="w-6 h-6" />,
  },
  {
    name: 'Tumblr',
    href: 'https://github.com/erikksuzuki/portfolio',
    icon: <IconTumblr className="w-6 h-6" />,
  },
  {
    name: 'Resume',
    href: 'https://github.com/erikksuzuki/portfolio',
    icon: <IconCv className="w-6 h-6" />,
  },
]
