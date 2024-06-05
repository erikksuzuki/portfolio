'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { useLayoutEffect, useEffect, useRef } from 'react'
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
import { runBlockscopeAnimation } from './animations'
import { useTranslations } from 'next-intl'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function WorkBlockscope() {
  const t = useTranslations('blockscope')
  const { isAboveMd, isBelowMd } = useBreakpoint('md')

  const triggerRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  useIsomorphicLayoutEffect(() => {
    const pin = runBlockscopeAnimation(triggerRef.current)
    return () => {
      pin.kill()
    }
  }, [])

  return (
    <div ref={isAboveMd ? triggerRef : null}>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pb-28">
        <div className="md:order-1 order-2 flex items-center">
          <WorkDescription
            title={t('blockscope.name')}
            label={t('blockscope.heading')}
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
            <p className="mb-3">{t('blockscope.description')}</p>
            <p className="mb-3">{t('blockscope.description2')}</p>
            <ul className="list-disc ml-4">
              <li>{t('blockscope.achievements.1')}</li>
              <li>{t('blockscope.achievements.2')}</li>
              <li>{t('blockscope.achievements.3')}</li>
              <li>{t('blockscope.achievements.4')}</li>
              <li>{t('blockscope.achievements.5')}</li>
              <li>{t('blockscope.achievements.6')}</li>
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
