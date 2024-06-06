'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'
import WorkDescription from '../common/WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import SlideShowLogo from './SlideShowLogo'
import SlideShowArtworks from './SlideShowArtworks'

import FreeportBackground from '@/assets/backgrounds/freeport-dark.jpg'
import SlideShowPurchase from './SlideShowPurchase'

import FreeportIcon from '@/assets/link-icons/freeport.png'
import WaybackMachineIcon from '@/assets/link-icons/waybackmachine.ico'
import ArtNewsIcon from '@/assets/link-icons/artnews.png'
import { runFreeportAnimations } from './animations'
import { useMessages, useTranslations } from 'next-intl'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreeport() {
  const t = useTranslations('freeport')
  const messages = useMessages() as any
  const paragraphsArray = Object.values(
    messages.freeport.freeport.paragraphs ?? {}
  )
  const achievementsArray = Object.values(
    messages.freeport.freeport.achievements ?? {}
  )
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pin = runFreeportAnimations(triggerRef.current)

    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-28">
        <div className="md:order-2 order-2 flex items-center">
          <WorkDescription
            title={t('freeport.name')}
            label={t('freeport.heading')}
            paragraphs={paragraphsArray}
            achievements={achievementsArray}
            technologies={[
              'React',
              'Next.js 14',
              'Tailwind CSS',
              'Contentful API',
              'Zod',
              'React Hook Forms',
            ]}
            links={[
              {
                label: 'ARTnews',
                href: 'https://www.artnews.com/art-news/news/freeport-nfts-andy-warhol-jane-holzer-1234667558/',
                iconSrc: ArtNewsIcon.src,
              },
              {
                label: 'Wayback Machine',
                href: 'https://web.archive.org/web/20230411000251/https://freeport.app/',
                iconSrc: WaybackMachineIcon.src,
              },
              {
                label: 'Website',
                href: 'https://freeport.app',
                iconSrc: FreeportIcon.src,
              },
            ]}
          />
        </div>
        <div
          className="md:order-1 order-1 overflow-hidden"
          ref={isBelowMd ? triggerRef : null}
        >
          <div
            className="h-[500px] relative rounded-2xl"
            style={{
              backgroundImage: `url(${FreeportBackground.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <SlideShowLogo />
            <SlideShowArtworks />
            <SlideShowPurchase />
          </div>
        </div>
      </section>
    </div>
  )
}
