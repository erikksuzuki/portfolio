'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

import WorkDescription from '../common/WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'

import GeminiBitriaBackground from '@/assets/backgrounds/gemini-bitria.jpg'
import SlideShowLogo from './SlideShowLogo'
import SlideShowOnboarding from './SlideShowOnboarding'

import CNBCIcon from '@/assets/link-icons/cnbc.ico'
import YouTubeIcon from '@/assets/link-icons/youtube.png'
import CoinDeskIcon from '@/assets/link-icons/coindesk.ico'
import { runGeminiAnimations } from './animations'
import { useMessages, useTranslations } from 'next-intl'
import { ExperienceLink } from '../common/LinkMenu'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkGemini() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')
  const t = useTranslations('gemini')
  const messages = useMessages() as any

  const paragraphsArray = Object.values(messages.gemini.gemini.paragraphs ?? {})
  const achievementsArray = Object.values(
    messages.gemini.gemini.achievements ?? {}
  )
  const technologiesArray: string[] = [
    'React',
    'React Context',
    'Storybook',
    'Jest',
    'Chart.js',
    'Material UI',
  ]
  const linkArray: ExperienceLink[] = [
    {
      label: 'CNBC',
      href: 'https://www.cnbc.com/2022/01/13/crypto-exchange-gemini-pushes-into-wealth-management-with-acquisition-of-bitria.html',
      iconSrc: CNBCIcon.src,
    },
    {
      label: 'CoinDesk',
      href: 'https://www.coindesk.com/business/2022/01/13/gemini-acquires-crypto-asset-management-platform-bitria-terms-undisclosed/',
      iconSrc: CoinDeskIcon.src,
    },
    {
      label: 'Product Video',
      href: 'https://www.youtube.com/watch?v=FE-8EthLBew',
      iconSrc: YouTubeIcon.src,
    },
  ]

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)
  useIsomorphicLayoutEffect(() => {
    const pin = runGeminiAnimations(triggerRef.current)
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-28">
        <div className="md:order-1 order-2 flex items-center">
          <WorkDescription
            label={t('gemini.heading')}
            title={t('gemini.name')}
            paragraphs={paragraphsArray}
            achievements={achievementsArray}
            technologies={technologiesArray}
            links={linkArray}
          />
        </div>
        <div
          className="overflow-hidden md:order-2 order-1"
          ref={isBelowMd ? triggerRef : null}
        >
          <div
            className="h-[500px] relative rounded-2xl"
            style={{
              backgroundImage: `url(${GeminiBitriaBackground.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <SlideShowLogo />
            <SlideShowOnboarding />
          </div>
        </div>
      </section>
    </div>
  )
}
