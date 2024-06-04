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

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreeport() {
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
            title="Freeport"
            label="Fine Art NFTs"
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
            technologies={[
              'React',
              'Next.js 14',
              'Tailwind CSS',
              'Contentful API',
              'Zod',
              'React Hook Forms',
            ]}
          >
            <p className="mb-3">
              Freeport was a Fractionalized Art Ownership Model Powered by
              Blockchain. Freeport was featured in ARTnews and enjoyed
              notability until late 2023.
            </p>
            <p className="mb-3">
              During my time at Freeport I worked closely with their co-founder
              and built several features, working primarily on their internal
              blog and KYC systems.
            </p>
            <ul className="list-disc ml-4">
              <li>Built initial landing page</li>
              <li>Built the Tailwind CSS configuration file</li>
              <li>
                Built blog and pagination system using Contentful&apos;s API
              </li>
              <li>Refactors to Contentful data parsing files</li>
              <li>Translated designs from Figma into Next.js</li>
              <li>Integrated React Hook Forms into their KYC system</li>
              <li>Integrated Google Places API and parsed geolocation data</li>
              <li>Wrote Zod data schemas for form validation</li>
            </ul>
          </WorkDescription>
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
