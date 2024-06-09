'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import {
  useLayoutEffect,
  useEffect,
  useRef,
  cloneElement,
  ReactElement,
} from 'react'
import WorkDescription from '../common/WorkDescription'
import { useBreakpoint } from '@/hooks/useBreakpoint'

import { NamespaceKeys, useMessages, useTranslations } from 'next-intl'
import { ExperienceLink } from './LinkMenu'
import clsx from 'clsx'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface WorkSectionProps {
  animationFunction: any
  translationKey: NamespaceKeys<IntlMessages, any>
  columnsReversed?: boolean
  linkArray: ExperienceLink[]
  technologiesArray: string[]
  illustrationBgSrc: string
  illustrationSlides: ReactElement[]
}

export default function WorkSection({
  animationFunction,
  translationKey,
  columnsReversed,
  linkArray,
  technologiesArray,
  illustrationBgSrc,
  illustrationSlides,
}: WorkSectionProps) {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')
  const messages = useMessages() as any

  const label = messages[translationKey][translationKey].heading
  const title = messages[translationKey][translationKey].name

  const paragraphsArray = Object.values(
    messages[translationKey][translationKey].paragraphs ?? {}
  )
  const achievementsArray = Object.values(
    messages[translationKey][translationKey].achievements ?? {}
  )

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)
  useIsomorphicLayoutEffect(() => {
    const pin = animationFunction(triggerRef.current)
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-28">
        <div
          className={clsx(
            'order-2 flex items-center',
            { 'md:order-1': !columnsReversed },
            { 'md:order-2': columnsReversed }
          )}
        >
          <WorkDescription
            label={label}
            title={title}
            paragraphs={paragraphsArray}
            achievements={achievementsArray}
            technologies={technologiesArray}
            links={linkArray}
          />
        </div>
        <div
          className={clsx(
            'order-1 overflow-hidden',
            { 'md:order-1': columnsReversed },
            { 'md:order-2': !columnsReversed }
          )}
          ref={isBelowMd ? triggerRef : null}
        >
          <div
            className="h-[500px] relative rounded-2xl"
            style={{
              backgroundImage: `url(${illustrationBgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {illustrationSlides.map((slide: ReactElement<any>, index: number) =>
              cloneElement(slide, { key: title + index })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
