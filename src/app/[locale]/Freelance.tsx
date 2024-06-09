'use client'

import WorkSection from '@/components/common/WorkSection'

import EbizoIcon from '@/assets/link-icons/ebizo.png'
import EMSEntertainmentIcon from '@/assets/link-icons/emsentertainment.jpg'
import MoneyDigestIcon from '@/assets/link-icons/moneydigest.png'
import FreelanceBackground from '@/assets/backgrounds/freelance.jpg'
import { runFreelanceAnimations } from '@/components/WorkFreelance/animations'
import SlideShowFreelanceLogo from '@/components/WorkFreelance/SlideShowLogo'
import SlideShowScreenshots from '@/components/WorkFreelance/SlideShowScreenshots'

const FreelanceSection = ({
  columnsReversed = false,
}: {
  columnsReversed?: boolean
}) => {
  return (
    <WorkSection
      translationKey={'freelance'}
      columnsReversed={columnsReversed}
      linkArray={[
        {
          label: 'EMS Entertainment',
          href: 'https://ems-entertainment.com',
          iconSrc: EMSEntertainmentIcon.src,
        },
        {
          label: "Ebizo Ichikawa XI's Japan Theater",
          href: 'https://archived.alkemyst.app/ebizo2014/index.htm',
          iconSrc: EbizoIcon.src,
        },
        {
          label: 'Money Digest',
          href: 'https://www.moneydigest.sg/comex-2015-it-show-at-suntec-city-3-6-sept-2015/',
          iconSrc: MoneyDigestIcon.src,
        },
      ]}
      technologiesArray={[
        'HTML',
        'CSS',
        'Wordpress',
        'WPBakery Builder',
        'jQuery',
        'PHP',
      ]}
      illustrationBgSrc={FreelanceBackground.src}
      animationFunction={runFreelanceAnimations}
      illustrationSlides={[
        <SlideShowFreelanceLogo key={'freelance1'} />,
        <SlideShowScreenshots key={'freelance2'} />,
      ]}
    />
  )
}

export default FreelanceSection
