'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

import WorkDescription from './WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreelance() {
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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pb-14">
        <WorkDescription
          title="Freelance"
          technologies={[
            'HTML',
            'CSS',
            'Javascript',
            'jQuery',
            'Wordpress',
            'Adobe Photoshop',
          ]}
        >
          <p className="mb-3">
            Before working with modern JavaScript frameworks and becoming a
            full-time software developer, I worked with several companies and
            clients building websites either in Wordpress or traditional HTML.
          </p>
          <p className="mb-3"></p>
          <ul className="list-disc ml-4">
            <li>Built promotional sites for Ichikawa Ebizo in 2014 and 2015</li>
            <li>Led the project management at a design agency</li>
            <li>Configured the DNS and hosting for several clients</li>
            <li>Built company-specific themes through Wordpress</li>
            <li>Designed logos, pamplets and invitation cards</li>
          </ul>
        </WorkDescription>
        <div
          className="border border-red overflow-hidden"
          ref={isBelowMd ? triggerRef : null}
        >
          <div className="company-logo border border-white h-[500px] w-full flex flex-row items-center justify-center relative">
            Placeholder text
          </div>
        </div>
      </section>
    </div>
  )
}
