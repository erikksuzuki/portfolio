'use client'

import WorkSection from '@/components/common/WorkSection'

import FreeportIcon from '@/assets/link-icons/freeport.png'
import WaybackMachineIcon from '@/assets/link-icons/waybackmachine.ico'
import ArtNewsIcon from '@/assets/link-icons/artnews.png'
import FreeportBackground from '@/assets/backgrounds/freeport-dark.jpg'
import { runFreeportAnimations } from '@/components/WorkFreeport/animations'
import SlideShowFreeportLogo from '@/components/WorkFreeport/SlideShowLogo'
import SlideShowArtworks from '@/components/WorkFreeport/SlideShowArtworks'
import SlideShowPurchase from '@/components/WorkFreeport/SlideShowPurchase'

const FreeportSection = ({
  columnsReversed = false,
}: {
  columnsReversed?: boolean
}) => {
  return (
    <WorkSection
      translationKey={'freeport'}
      columnsReversed={columnsReversed}
      linkArray={[
        {
          label: 'ARTnews',
          href: 'https://www.artnews.com/art-news/news/freeport-nfts-andy-warhol-jane-holzer-1234667558/',
          iconSrc: ArtNewsIcon.src,
        },
        {
          label: 'Wayback Machine',
          href: 'https://web.archive.org/web/20230411000251/https://freeport.app/',
          iconSrc: WaybackMachineIcon.src,
        },
        {
          label: 'Website',
          href: 'https://web.archive.org/web/20241210091024/https://freeport.app/',
          iconSrc: FreeportIcon.src,
        },
      ]}
      technologiesArray={[
        'React',
        'Next.js 14',
        'Tailwind CSS',
        'Contentful API',
        'Zod',
        'React Hook Forms',
      ]}
      illustrationBgSrc={FreeportBackground.src}
      animationFunction={runFreeportAnimations}
      illustrationSlides={[
        <SlideShowFreeportLogo key={'freeport1'} />,
        <SlideShowArtworks key={'freeport2'} />,
        <SlideShowPurchase key={'freeport3'} />,
      ]}
    />
  )
}

export default FreeportSection
