'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

import GeminiLogo from '@/assets/geminiBitriaLogo.png'
import BitriaAccountCard from './BitriaAccountCard'
import WorkDescription from './WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkGemini() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pinLogo = gsap.to('.company-logo', {
      scale: 0,
      opacity: 0,
      ease: 'none',
      duration: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'center center',
        end: '1000 top',
        scrub: 0.6,
        pin: true,
      },
    })

    return () => {
      pinLogo.kill()
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
            cryptocurrencies, and Gemini Trust Company, LLC is an American
            cryptocurrency exchange and custodian bank.
          </p>
          <p className="mb-3">
            During my time at the company, I built many new features for their
            and improved several others. My work included:
          </p>
          <ul className="list-disc ml-4">
            <li>Built transaction details page</li>
            <li>Built responsive, animated onboarding page</li>
            <li>Built white labeling functions</li>
            <li>Built loading skeletons for tables</li>
            <li>Unit testing, code reviews, Github project management</li>
            <li>Created Custom SVG icons made in Adobe Illustrator</li>
            <li>Refactored class components into functional components</li>
            <li>Several refactors to state management and context API files</li>
            <li>Code splitting and asynchronous loading</li>
          </ul>
        </WorkDescription>
        <div
          className="border border-red overflow-hidden"
          ref={isBelowMd ? triggerRef : null}
        >
          <div className="company-logo border border-white h-[500px] w-full flex flex-row items-center justify-center relative">
            <img src={GeminiLogo.src} className="h-10 w-auto" />
          </div>
        </div>
      </section>
    </div>
  )
}
