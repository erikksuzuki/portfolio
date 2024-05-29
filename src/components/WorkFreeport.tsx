'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreeport() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
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
      }
    )
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <section className="overflow-hidden grid grid-cols-2" ref={triggerRef}>
      <div className="px-4 justify-center flex flex-col">
        <h1 className="text-theme-heading-xs font-poppins mb-3">Freeport</h1>
        <p className="text-theme-sm font-exo">
          Freeport was a Fractionalized Art Ownership Model Powered by
          Blockchain. During my work at the company I built their initial
          landing page with Tailwind CSS and Next.js, their blog and pagination
          system from Figma designs and KYC forms using React Hook Forms and Zod
          for form validation. Geolocation data from Google Places API was
          parsed by me and used to add country-specific information about the
          users. Freeport was featured in ARTnews and enjoyed notability until
          late 2023.
        </p>
        <div className="mt-5 text-theme-sm">
          <h2>Technologies used:</h2>
          <div className="grid grid-cols-3 mt-4 text-theme-xs text-[rgba(255,255,255,0.7)]">
            <ul className="list-disc ml-4 ">
              <li className="mb-2">React</li>
              <li className="mb-2">Next.js 14</li>
            </ul>
            <ul className="list-disc ml-4">
              <li className="mb-2">Tailwind CSS</li>
              <li className="mb-2">Contentful API</li>
            </ul>
            <ul className="list-disc ml-4">
              <li className="mb-2">Zod</li>
              <li className="mb-2">React Hook Forms</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border border-red overflow-hidden">
        <div
          ref={sectionRef}
          className="border border-white h-[500px] w-[2778px] flex flex-row items-center justify-center relative"
        >
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
