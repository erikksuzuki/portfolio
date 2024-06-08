'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

import WorkDescription from '../common/WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'

import EbizoIcon from '@/assets/link-icons/ebizo.png'
import EMSEntertainmentIcon from '@/assets/link-icons/emsentertainment.jpg'
import MoneyDigestIcon from '@/assets/link-icons/moneydigest.png'
// import { runGeminiAnimations } from './animations'
import { useMessages, useTranslations } from 'next-intl'
import { ExperienceLink } from '../common/LinkMenu'
import SlideShowLogo from './SlideShowLogo'

import FreelanceBackground from '@/assets/backgrounds/freelance.jpg'
import { runFreelanceAnimations } from './animations'
import SlideShowScreenshots from './SlideShowScreenshots'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreelance() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')
  const t = useTranslations('freelance')
  const messages = useMessages() as any

  const paragraphsArray = Object.values(
    messages.freelance.freelance.paragraphs ?? {}
  )
  const achievementsArray = Object.values(
    messages.freelance.freelance.achievements ?? {}
  )
  const technologiesArray: string[] = [
    'HTML',
    'CSS',
    'Wordpress',
    'WPBakery Builder',
    'jQuery',
    'PHP',
  ]
  const linkArray: ExperienceLink[] = [
    {
      label: 'EMS Entertainment',
      href: 'https://ems-entertainment.com',
      iconSrc: EMSEntertainmentIcon.src,
    },
    {
      label: "Ebizo Ichikawa XI's Japan Theater",
      href: 'https://archived.alkemyst.app/ebizo2014/index.htm',
      iconSrc: EbizoIcon.src,
    },
    {
      label: 'Money Digest',
      href: 'https://www.moneydigest.sg/comex-2015-it-show-at-suntec-city-3-6-sept-2015/',
      iconSrc: MoneyDigestIcon.src,
    },
  ]

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)
  useIsomorphicLayoutEffect(() => {
    const pin = runFreelanceAnimations(triggerRef.current)
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-28">
        <div className="md:order-2 order-2 flex items-center">
          <WorkDescription
            label={t('freelance.heading')}
            title={t('freelance.name')}
            paragraphs={paragraphsArray}
            achievements={achievementsArray}
            technologies={technologiesArray}
            links={linkArray}
          />
        </div>
        <div
          className="overflow-hidden md:order-1 order-1"
          ref={isBelowMd ? triggerRef : null}
        >
          <div
            className="h-[500px] relative rounded-2xl"
            style={{
              backgroundImage: `url(${FreelanceBackground.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <SlideShowLogo />
            <SlideShowScreenshots />
          </div>
        </div>
      </section>
    </div>
  )
}
