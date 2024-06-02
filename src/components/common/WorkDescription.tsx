import { type ReactNode } from 'react'

interface WorkDescriptionProps {
  title?: string
  children?: ReactNode
  technologies?: string[]
}

const WorkDescription = ({
  title = 'Company',
  children,
  technologies = [],
}: WorkDescriptionProps) => {
  return (
    <div className="justify-center flex flex-col">
      <h1 className="text-theme-heading-xs font-poppins mb-3">{title}</h1>
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
