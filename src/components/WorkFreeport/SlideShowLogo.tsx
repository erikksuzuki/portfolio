import FreeportLogoText from '@/assets/icons/freeport-icons/IconFreeportText'
import IconFreeportCircle from '@/assets/icons/freeport-icons/IconFreeportCircle'
import Image from 'next/image'

const SlideShowLogo = () => {
  return (
    <div className="text-white freeport-logo overflow-hidden w-full h-[500px] flex justify-center items-center gap-x-2">
      <IconFreeportCircle className="w-8 h-8" />
      <FreeportLogoText className="w-[84px] h-[30px]" />
    </div>
  )
}

export default SlideShowLogo
