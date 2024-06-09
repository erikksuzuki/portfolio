import Image from 'next/image'
import GeminiBitriaLogo from '@/assets/gemini/gemini-logo.png'

const SlideShowGeminiLogo = () => {
  return (
    <div className="text-white overflow-hidden w-full h-[500px] flex justify-center items-center gap-x-2">
      <div className="gemini-logo">
        <Image
          width={280}
          height={34}
          src={GeminiBitriaLogo.src}
          alt="Gemini Bitria"
        />
      </div>
    </div>
  )
}

export default SlideShowGeminiLogo
