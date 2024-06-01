'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

import GeminiLogo from '@/assets/geminiBitriaLogo.png'
import BitriaAccountCard from '../BitriaAccountCard'
import WorkDescription from '../WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'

import GeminiBitriaBackground from '@/assets/backgrounds/gemini-bitria.jpg'
import SlideShowLogo from './SlideShowLogo'
import SlideShowOnboarding from './SlideShowOnboarding'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkGemini() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pin = gsap
      .timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'center center',
          end: '1200 top',
          scrub: 0.6,
          pin: true,
        },
      })
      .to('.gemini-logo', {
        opacity: '0',
        ease: 'none',
        duration: 1,
      })
      .to(
        '.gemini-logo',
        {
          translateY: '-30px',
          ease: 'none',
          duration: 1,
        },
        '<'
      )
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 py-14">
        <WorkDescription
          title="Gemini"
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
            by Gemini Trust Company, LLC is an American cryptocurrency exchange
            and custodian bank.
          </p>
          <p className="mb-3">
            I joined the company early and helped to modernize and refactor much
            of the front-end architecture. I also built many new UI elements,
            improved existing ones and had ownership of several features. My
            work included:
          </p>
          <ul className="list-disc ml-4">
            <li>Refactored class components into functional components</li>
            <li>Several refactors to state management and context API files</li>
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
        <div className="overflow-hidden" ref={isBelowMd ? triggerRef : null}>
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
