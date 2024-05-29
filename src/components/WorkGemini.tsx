'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

import GeminiLogo from '@/assets/geminiBitriaLogo.png'
import BitriaAccountCard from './BitriaAccountCard'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkGemini() {
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
    <section className="overflow-hidden grid grid-cols-2" ref={triggerRef}>
      <div className="px-4 justify-center flex flex-col">
        <h1 className="text-theme-heading-xs font-poppins mb-3">Gemini</h1>
        <p className="text-theme-sm font-exo">
          During my time at the Decentralized Finance startup BITRIA, the
          engineering team and our Head of Product collaborated to completely
          redesign the platform’s user interface at an early stage when it
          lacked many of today’s common web application features. Much of the
          effort to improve the platform’s aesthetics was spearheaded by me,
          inluding the addition of loading placeholders, custom SVG icons for
          crypto assets, and CSS animations. I also led the development of their
          Client Onboarding and White Labeling features. As a result, together
          with the excellent engine our backend team created, we were acquired
          by Gemini Trust Company, a prominent cryptocurrency exchange and
          custodian bank.
        </p>
        <div className="mt-5 text-theme-sm">
          <h2>Technologies used:</h2>
          <div className="grid grid-cols-3 mt-4 text-theme-xs text-[rgba(255,255,255,0.7)]">
            <ul className="list-disc ml-4 ">
              <li className="mb-2">React</li>
              <li className="mb-2">React Context</li>
            </ul>
            <ul className="list-disc ml-4">
              <li className="mb-2">Storybook</li>
              <li className="mb-2">Jest</li>
            </ul>
            <ul className="list-disc ml-4">
              <li className="mb-2">Chart.js</li>
              <li className="mb-2">Material UI</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border border-red overflow-hidden">
        <div className="company-logo border border-white h-[500px] w-full flex flex-row items-center justify-center relative">
          <img src={GeminiLogo.src} className="h-10 w-auto" />
        </div>
      </div>
    </section>
  )
}
