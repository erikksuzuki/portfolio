import Image from 'next/image'
import GeminiAccountCard from './GeminiAccountCard'
import GeminiAccountHeader from './GeminiAccountHeader'

const SlideShowOnboarding = () => {
  return (
    <div className="overflow-hidden w-full h-[500px] flex flex-col justify-center items-center absolute top-0 left-0">
      <div
        className="gemini-onboarding"
        style={{ translate: '0px 100px 0px', height: '800px' }}
      >
        <div className="gemini-account-header mb-3">
          <GeminiAccountHeader />
        </div>
        {Array.from(Array(2).keys()).map((card) => (
          <div key={card} className="gemini-account-card mb-3">
            <GeminiAccountCard />
          </div>
        ))}
        <div className="gemini-account-add flex flex-col justify-center py-6 items-center text-theme-sm m-6 border-[3px] rounded-lg border-dotted border-white text-white opacity-[0.7]">
          <div className="text-theme-heading-xl" style={{ lineHeight: '34px' }}>
            +
          </div>
          Add Account
        </div>
      </div>
    </div>
  )
}

export default SlideShowOnboarding
