'use client'

import { type ReactNode } from 'react'
import LinkMenu, { ExperienceLink } from './LinkMenu'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

interface WorkDescriptionProps {
  title?: string
  headerTitle?: boolean
  label?: string
  children?: ReactNode
  paragraphs?: string[] | unknown[]
  achievements?: string[] | unknown[]
  links?: ExperienceLink[]
  technologies?: string[]
  technologiesLabel?: string
}

const WorkDescription = ({
  label = 'Featured Work',
  title = 'Company',
  headerTitle = false,
  paragraphs,
  achievements,
  links,
  technologies = [],
  technologiesLabel,
}: WorkDescriptionProps) => {
  const t = useTranslations('common')
  const defaultTechnologyLabel = t('common.technologyline')
  return (
    <div className="justify-center flex flex-col">
      <label className="uppercase text-[#0f0] font-semibold text-[10px] tracking-widest">
        {label}
      </label>
      <div className="w-full flex justify-between items-center mb-3">
        <h1
          className={clsx(
            { 'text-theme-heading-xs font-poppins': !headerTitle },
            { 'text-theme-heading-sm': headerTitle }
          )}
        >
          {title}
        </h1>
        <LinkMenu experienceLinks={links} />
      </div>
      <div className="text-theme-sm text-[rgba(255,255,255,0.7)]">
        {paragraphs &&
          paragraphs.map((paragraph: any, index: number) => (
            <p
              key={index}
              className={clsx({ 'mb-3': index !== paragraphs.length - 1 })}
            >
              {paragraph}
            </p>
          ))}
        {achievements && (
          <ul className="list-disc ml-4 mt-3">
            {achievements.map((achievement: any) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-5 text-theme-sm">
        <h2>{technologiesLabel ?? defaultTechnologyLabel}</h2>
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
