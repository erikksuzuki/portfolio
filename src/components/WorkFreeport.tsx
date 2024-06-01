'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'
import WorkDescription from './WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreeport() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pin = gsap.to('.section-animation', {
      translateX: '-1852px',
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
      pin.kill()
    }
  }, [])

  return (
    <section
      className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-x-8 my-14"
      ref={isAboveMd ? triggerRef : null}
    >
      <WorkDescription
        title="Freeport"
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
          Blockchain. Freeport was featured in ARTnews and enjoyed notability
          until late 2023.
        </p>
        <p className="mb-3">
          During my time at Freeport I worked closely with their co-founder and
          built several features, working primarily on their internal blog and
          KYC systems.
        </p>
        <ul className="list-disc ml-4">
          <li>Built initial landing page</li>
          <li>Built the Tailwind CSS configuration file</li>
          <li>Built blog and pagination system using Contentful&apos;s API</li>
          <li>Refactors to Contentful data parsing files</li>
          <li>Translated designs from Figma into Next.js</li>
          <li>Integrated React Hook Forms into their KYC system</li>
          <li>Integrated Google Places API and parsed geolocation data</li>
          <li>Wrote Zod data schemas for form validation</li>
        </ul>
      </WorkDescription>
      <div
        className="border border-red overflow-hidden"
        ref={isBelowMd ? triggerRef : null}
      >
        <div className="section-animation border border-white h-[500px] w-[2778px] flex flex-row items-center justify-center relative">
          <div className="w-[926px] text-center">
            <h3>Section 1</h3>
          </div>
          <div className="w-[926px] text-center">
            <h3>Section 2</h3>
          </div>
          <div className="w-[926px] text-center">
            <h3>Section 3</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
