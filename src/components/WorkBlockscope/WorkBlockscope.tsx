'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { useLayoutEffect, useEffect, useRef } from 'react'
import WorkDescription from '../WorkDescription'
import { useBreakpoint } from '@/hooks/useBreakpoint'

import 'simplebar-react/dist/simplebar.min.css'

import SlideShowLogo from './SlideShowLogo'
import SlideShowIcons from './SlideShowIcons'
import SlideShowCodeBlock from './SlideShowCodeBlock'

import BlockscopeBackground from '@/assets/backgrounds/blockscope.jpg'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkBlockscope() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)

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
      .to('.blockscope-logo', {
        opacity: '0',
        ease: 'none',
        duration: 1,
      })
      .to(
        '.blockscope-logo',
        {
          translateY: '-30px',
          ease: 'none',
          duration: 1,
        },
        '<'
      )
      .fromTo(
        '.icon-grid .icon-img',
        {
          translateY: '30px',
          opacity: 0,
        },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 0.5,
        }
      )
      .to('.icon-grid .icon-img', {
        translateY: '30px',
        opacity: 0,
        ease: 'back',
        duration: 0.5,
      })
      .fromTo(
        '.code-section .code-lang-option',
        {
          translateY: '30px',
          opacity: 0,
        },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          stagger: 0.1,
          duration: 0.5,
        }
      )
      .fromTo(
        '.code-url',
        {
          translateY: '30px',
          opacity: 0,
        },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          duration: 0.5,
        }
      )
      .to('.code-section', {
        translateY: '-36px',
        ease: 'back',
        duration: 2,
      })
      .fromTo(
        '.code-block',
        {
          translateY: '30px',
          opacity: 0,
        },
        {
          translateY: '0px',
          opacity: 1,
          ease: 'back',
          duration: 0.5,
        },
        '<0.5'
      )
    // .to('.codetext', {
    //   text: {
    //     value:
    //       'this is a custom text written to show my easy approaches to make the typewriting easy!',
    //   },
    //   duration: 5,
    //   ease: 'none',
    // })
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-14 mb-14 py-14">
        <WorkDescription
          title="Blockscope"
          technologies={[
            'React',
            'React Query',
            'Bootstrap',
            'Redux',
            'Zustand',
            'react-flame-graph',
            'EchartsJS',
            'react-code-blocks',
          ]}
        >
          <p className="mb-3">
            Blockscope is a Web3 data platform that enables anyone interested in
            on-chain data to quickly spin up live or historical data pipelines.{' '}
          </p>
          <p className="mb-3">
            During my time at the company, I built many new features for their
            core products and improved several others.
          </p>
          <ul className="list-disc ml-4">
            <li>Built Product landing pages</li>
            <li>Built Internal API documentation</li>
            <li>Built Gas profiler using react-flame-chart</li>
            <li>Created Custom SVG icons made in Adobe Illustrator</li>
            <li>Built Web3 Hacks Directory Dashboard and pages</li>
            <li>
              Redesigned and refactored Trace Call Tree, Web3 Entities Directory
              Pages, Decode visibility charts and data tables
            </li>
          </ul>
        </WorkDescription>
        <div className="overflow-hidden" ref={isBelowMd ? triggerRef : null}>
          <div
            className="h-[500px] relative rounded-2xl"
            style={{
              backgroundImage: `url(${BlockscopeBackground.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <SlideShowLogo />
            <SlideShowIcons />
            <SlideShowCodeBlock />
          </div>
        </div>
      </section>
    </div>
  )
}
