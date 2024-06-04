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

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkGemini() {
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
            title="Gemini BITRIA"
            label="Web 3 Asset Management"
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
            <p className="mb-3">
              BITRIA was a digital turnkey asset management startup for
              cryptocurrencies, a platform we built that was eventually acquired
              by Gemini Trust Company, LLC is an American cryptocurrency
              exchange and custodian bank. The platform remained active until
              2024 when it was assimilated into Gemini&apos;s larger ecosystem.
            </p>
            <p className="mb-3">
              I joined the company early and helped to modernize and refactor
              much of the front-end architecture. I also built many new UI
              elements, improved existing ones and had ownership of several
              features.
            </p>
            <ul className="list-disc ml-4">
              <li>Refactored class components into functional components</li>
              <li>
                Several refactors to state management and context API files
              </li>
              <li>Code splitting and asynchronous loading</li>
              <li>Created Custom SVG icons made in Adobe Illustrator</li>
              <li>Built loading skeletons for tables</li>
              <li>Built transaction details page</li>
              <li>Built responsive, animated onboarding page</li>
              <li>Built white labeling functionality</li>
              <li>Wrote unit tests and Storybook components</li>
              <li>
                Reviewed code on Github and participated in kanban-style project
                management
              </li>
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
