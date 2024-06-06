'use client'

import { type ReactNode } from 'react'
import LinkMenu, { ExperienceLink } from './LinkMenu'
import { useTranslations } from 'next-intl'

interface WorkDescriptionProps {
  title?: string
  label?: string
  children?: ReactNode
  paragraphs?: string[] | unknown[]
  achievements?: string[] | unknown[]
  links?: ExperienceLink[]
  technologies?: string[]
}

const WorkDescription = ({
  label = 'Featured Work',
  title = 'Company',
  paragraphs,
  achievements,
  links,
  technologies = [],
}: WorkDescriptionProps) => {
  const t = useTranslations('common')
  return (
    <div className="justify-center flex flex-col">
      <label className="uppercase text-[#0f0] text-[10px] tracking-widest">
        {label}
      </label>
      <div className="w-full flex justify-between items-center mb-3">
        <h1 className="text-theme-heading-xs font-poppins">{title}</h1>
        <LinkMenu experienceLinks={links} />
      </div>
      <div className="text-theme-sm text-[rgba(255,255,255,0.7)]">
        {paragraphs &&
          paragraphs.map((paragraph: any, index: number) => (
            <p key={index} className="mb-3">
              {paragraph}
            </p>
          ))}
        <ul className="list-disc ml-4">
          {achievements &&
            achievements.map((achievement: any) => (
              <li key={achievement}>{achievement}</li>
            ))}
        </ul>
      </div>
      <div className="mt-5 text-theme-sm">
        <h2>{t('common.technologyline')}</h2>
        <div className="mt-4 text-theme-xs text-[rgba(255,255,255,0.7)]">
          <ul className="list-disc ml-4 grid grid-cols-2 md:grid-cols-3 ">
            {technologies.map((technology: string) => (
              <li className="mb-2" key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WorkDescription
