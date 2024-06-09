'use client'

import WorkSection from '@/components/common/WorkSection'

import CNBCIcon from '@/assets/link-icons/cnbc.ico'
import YouTubeIcon from '@/assets/link-icons/youtube.png'
import CoinDeskIcon from '@/assets/link-icons/coindesk.ico'
import GeminiBackground from '@/assets/backgrounds/gemini-bitria.jpg'
import { runGeminiAnimations } from '@/components/WorkGemini/animations'
import SlideShowGeminiLogo from '@/components/WorkGemini/SlideShowLogo'
import SlideShowOnboarding from '@/components/WorkGemini/SlideShowOnboarding'

const GeminiSection = ({
  columnsReversed = false,
}: {
  columnsReversed?: boolean
}) => {
  return (
    <WorkSection
      translationKey={'gemini'}
      columnsReversed={columnsReversed}
      linkArray={[
        {
          label: 'CNBC',
          href: 'https://www.cnbc.com/2022/01/13/crypto-exchange-gemini-pushes-into-wealth-management-with-acquisition-of-bitria.html',
          iconSrc: CNBCIcon.src,
        },
        {
          label: 'CoinDesk',
          href: 'https://www.coindesk.com/business/2022/01/13/gemini-acquires-crypto-asset-management-platform-bitria-terms-undisclosed/',
          iconSrc: CoinDeskIcon.src,
        },
        {
          label: 'Product Video',
          href: 'https://www.youtube.com/watch?v=FE-8EthLBew',
          iconSrc: YouTubeIcon.src,
        },
      ]}
      technologiesArray={[
        'React',
        'React Context',
        'Storybook',
        'Jest',
        'Chart.js',
        'Material UI',
      ]}
      illustrationBgSrc={GeminiBackground.src}
      animationFunction={runGeminiAnimations}
      illustrationSlides={[
        <SlideShowGeminiLogo key={'gemini1'} />,
        <SlideShowOnboarding key={'gemini2'} />,
      ]}
    />
  )
}

export default GeminiSection
