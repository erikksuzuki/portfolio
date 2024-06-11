'use client'

import WorkSection from '@/components/common/WorkSection'

import CrunchbaseIcon from '@/assets/link-icons/crunchbase.png'
import BlockscopeIcon from '@/assets/link-icons/blockscope.ico'
import YCombinatorIcon from '@/assets/link-icons/ycombinator.ico'
import BlockscopeBackground from '@/assets/backgrounds/blockscope.jpg'
import { runBlockscopeAnimation } from '@/components/WorkBlockscope/animations'
import SlideShowLogo from '@/components/WorkBlockscope/SlideShowLogo'
import SlideShowIcons from '@/components/WorkBlockscope/SlideShowIcons'
import SlideShowCodeBlock from '@/components/WorkBlockscope/SlideShowCodeBlock'

const BlockscopeSection = ({
  columnsReversed = false,
}: {
  columnsReversed?: boolean
}) => {
  return (
    <WorkSection
      translationKey={'blockscope'}
      columnsReversed={columnsReversed}
      linkArray={[
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
      technologiesArray={[
        'React',
        'React Query',
        'React Bootstrap',
        'React Tables',
        'Redux',
        'Zustand',
        'react-flame-graph',
        'EchartsJS',
        'react-code-blocks',
      ]}
      illustrationBgSrc={BlockscopeBackground.src}
      animationFunction={runBlockscopeAnimation}
      illustrationSlides={[
        <SlideShowLogo key={'blockscope1'} />,
        <SlideShowIcons key={'blockscope2'} />,
        <SlideShowCodeBlock key={'blockscope3'} />,
      ]}
    />
  )
}

export default BlockscopeSection
