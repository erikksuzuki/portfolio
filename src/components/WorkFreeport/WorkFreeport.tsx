'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect, useRef } from 'react'
import WorkDescription from '../WorkDescription'

import { useBreakpoint } from '@/hooks/useBreakpoint'
import SlideShowLogo from './SlideShowLogo'
import SlideShowArtworks from './SlideShowArtworks'

import FreeportBackground from '@/assets/backgrounds/freeport-dark.jpg'
import FreeportInvestmentCard from './FreeportInvestmentCard'
import SlideShowPurchase from './SlideShowPurchase'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkFreeport() {
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
      .to('.freeport-logo', {
        opacity: '0',
        translateY: '-30px',
        ease: 'none',
        duration: 1,
      })
      .fromTo(
        '#freeport-marilyn-img',
        { translateY: '-120px', opacity: 0 },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        }
      )
      .fromTo(
        '#freeport-marilyn-price',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        }
      )
      .fromTo(
        '#freeport-marilyn-artist',
        { translateY: '30px', opacity: 0 },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        },
        '<0.2'
      )
      .fromTo(
        '#freeport-marilyn-title',
        { translateY: '30px', opacity: 0 },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        },
        '<0.2'
      )
      .fromTo(
        '#freeport-marilyn-description',
        { translateY: '30px', opacity: 0 },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        },
        '<0.2'
      )
      .fromTo(
        '#freeport-marilyn',
        { translateX: '0px', opacity: 1 },
        {
          translateX: '-120px',
          opacity: 0,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        }
      )
      .fromTo(
        '.freeport-purchase-section',
        { translateX: '-120px', opacity: 0 },
        {
          translateX: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 1,
        }
      )
      .fromTo(
        '.step-dot',
        { translateX: '30px', opacity: 0 },
        {
          translateX: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 0.5,
        },
        '<'
      )
      .fromTo(
        '.step-line',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
        },
        '<'
      )
      .fromTo(
        '.fp-purchase-line',
        { translateY: '30px', opacity: 0 },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 0.5,
        },
        '<0.2'
      )

    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-x-8 pb-28">
        <div className="md:order-2 flex items-center">
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
          className="md:order-1 overflow-hidden"
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
