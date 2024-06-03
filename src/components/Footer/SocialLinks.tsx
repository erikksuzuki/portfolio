import IconGithub from '@/assets/icons/common/IconGithub'
import IconInstagram from '@/assets/icons/common/IconInstagram'
import IconLinkedin from '@/assets/icons/common/IconLinkedin'
import IconTumblr from '@/assets/icons/common/IconTumblr'
import Link from 'next/link'
import clsx from 'clsx'

const SocialLinks = ({
  className,
  label = 'Find me on:',
}: {
  className?: string
  label?: string
}) => {
  return (
    <section className={clsx(className, 'flex flex-col gap-4')}>
      <p className="text-theme-sm">{label}</p>
      <div className="flex flex-row gap-6 items-end">
        <Link target="_blank" href="https://github.com/erikksuzuki/portfolio">
          <IconGithub className="w-6 h-6" />
        </Link>
        <Link target="_blank" href="https://www.instagram.com/erikksuzuki">
          <IconInstagram className="w-6 h-6" />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/eric-suzuki-04380449/"
        >
          <IconLinkedin className="w-6 h-6" />
        </Link>
        <Link target="_blank" href="https://emptyblueprints-blog.tumblr.com">
          <IconTumblr className="w-6 h-6" />
        </Link>
      </div>
    </section>
  )
}

export default SocialLinks
