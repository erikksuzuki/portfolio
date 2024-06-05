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
import { useTranslations } from 'next-intl'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkGemini() {
  const t = useTranslations('gemini')
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

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
            title={t('gemini.name')}
            label={t('gemini.heading')}
            links={[
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
            ]}
            technologies={[
              'React',
              'React Context',
              'Storybook',
              'Jest',
              'Chart.js',
              'Material UI',
            ]}
          >
            <p className="mb-3">{t('gemini.description')}</p>
            <p className="mb-3">{t('gemini.description2')}</p>
            <ul className="list-disc ml-4">
              <li>{t('gemini.achievements.1')}</li>
              <li>{t('gemini.achievements.2')}</li>
              <li>{t('gemini.achievements.3')}</li>
              <li>{t('gemini.achievements.4')}</li>
              <li>{t('gemini.achievements.5')}</li>
              <li>{t('gemini.achievements.6')}</li>
              <li>{t('gemini.achievements.7')}</li>
              <li>{t('gemini.achievements.8')}</li>
              <li>{t('gemini.achievements.9')}</li>
              <li>{t('gemini.achievements.10')}</li>
            </ul>
          </WorkDescription>
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
