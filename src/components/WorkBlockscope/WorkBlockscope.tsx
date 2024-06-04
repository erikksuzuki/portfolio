'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useEffect } from 'react'
import WorkDescription from '../common/WorkDescription'
import { useBreakpoint } from '@/hooks/useBreakpoint'

import 'simplebar-react/dist/simplebar.min.css'

import SlideShowLogo from './SlideShowLogo'
import SlideShowIcons from './SlideShowIcons'
import SlideShowCodeBlock from './SlideShowCodeBlock'

import BlockscopeBackground from '@/assets/backgrounds/blockscope.jpg'

import CrunchbaseIcon from '@/assets/link-icons/crunchbase.png'
import BlockscopeIcon from '@/assets/link-icons/blockscope.ico'
import YCombinatorIcon from '@/assets/link-icons/ycombinator.ico'
import clsx from 'clsx'
import { runBlockscopeAnimation } from './animations'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkBlockscope() {
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pin = runBlockscopeAnimation()
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div className={clsx({ 'blockscope-trigger': isAboveMd })}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-28">
        <div className="md:order-1 order-2 flex items-center">
          <WorkDescription
            title="Blockscope"
            label="Web 3 Analytics"
            links={[
              {
                label: 'Y Combinator',
                href: 'https://www.ycombinator.com/companies/blockscope',
                iconSrc: YCombinatorIcon.src,
              },

              {
                label: 'Crunchbase',
                href: 'https://www.crunchbase.com/organization/blockscope',
                iconSrc: CrunchbaseIcon.src,
              },
              {
                label: 'Website',
                href: 'https://blockscope.co',
                iconSrc: BlockscopeIcon.src,
              },
            ]}
            technologies={[
              'React',
              'React Query',
              'Bootstrap',
              'Redux',
              'Zustand',
              'react-flame-graph',
              'EchartsJS',
              'react-code-blocks',
              'Adobe Illustrator',
            ]}
          >
            <p className="mb-3">
              Blockscope is a Web3 data platform that enables anyone interested
              in on-chain data to quickly spin up live or historical data
              pipelines.{' '}
            </p>
            <p className="mb-3">
              During my time at the company, I built new features for their core
              products and improved several others.
            </p>
            <ul className="list-disc ml-4">
              <li>Built Product landing pages</li>
              <li>Built Internal API documentation</li>
              <li>Built Gas profiler using react-flame-chart</li>
              <li>Created Custom SVG icons made in Adobe Illustrator</li>
              <li>Built Web3 Hacks Directory Dashboard and pages</li>
              <li>
                Redesigned and refactored Trace Call Tree, Web3 Entities
                Directory Pages, Decode visibility charts and data tables
              </li>
            </ul>
          </WorkDescription>
        </div>
        <div
          className={clsx('overflow-hidden md:order-2 order-1', {
            'blockscope-trigger': isBelowMd,
          })}
        >
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
