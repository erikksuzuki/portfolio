'use client'

import { type ReactNode } from 'react'
import LinkMenu, { ExperienceLink } from './LinkMenu'

interface WorkDescriptionProps {
  title?: string
  children?: ReactNode
  links?: ExperienceLink[]
  technologies?: string[]
}

const WorkDescription = ({
  title = 'Company',
  children,
  links,
  technologies = [],
}: WorkDescriptionProps) => {
  return (
    <div className="justify-center flex flex-col">
      <div className="w-full flex justify-between items-center mb-3">
        <h1 className="text-theme-heading-xs font-poppins">{title}</h1>
        <LinkMenu experienceLinks={links} />
      </div>
      <div className="text-theme-sm font-exo text-[rgba(255,255,255,0.7)]">
        {children}
      </div>
      <div className="mt-5 text-theme-sm">
        <h2>Technologies used:</h2>
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
