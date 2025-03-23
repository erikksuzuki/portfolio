'use client'

import WorkSection from '@/components/common/WorkSection'

import AkamiIcon from '@/assets/link-icons/ios-tinted.png'

import AkamiBackground from '@/assets/akami/screen2.jpg'

import AppStoreButton from '@/assets/apple-download-shadow.png'
import AppleFavicon from '@/assets/link-icons/apple-favicon.ico'

const AkamiSection = ({
  columnsReversed = false,
}: {
  columnsReversed?: boolean
}) => {
  return (
    <WorkSection
      translationKey={'akami'}
      columnsReversed={columnsReversed}
      linkArray={[
        {
          label: 'AKAMI Marketing Page',
          href: 'https://www.akami.app',
          iconSrc: AkamiIcon.src,
        },
        {
          label: 'AKAMI Change Log',
          href: 'https://www.akami.app/change-log',
          iconSrc: AkamiIcon.src,
        },
        {
          label: 'AKAMI Beta Testing Page',
          href: 'https://testflight.apple.com/join/cDVybjfu',
          iconSrc: AppleFavicon.src,
        },
      ]}
      technologiesArray={[
        'Expo React Native',
        'Supabase',
        'Google Cloud API',
        'OpenAI API',
        'Text-To-Speech API',
        'Zustand',
      ]}
      ctaSection={() => {
        return (
          <div className="w-full mt-4">
            <a
              href="https://testflight.apple.com/join/cDVybjfu"
              target="_blank"
            >
              <img
                className="max-w-[180px]"
                src={AppStoreButton.src}
                alt="Download from the App Store"
              />
            </a>
          </div>
        )
      }}
      illustrationBgSrc={AkamiBackground.src}
      // animationFunction={runBlockscopeAnimation}
      illustrationSlides={[]}
    />
  )
}

export default AkamiSection
