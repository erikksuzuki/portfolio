import FreeportLogoText from '@/assets/icons/freeport-icons/IconFreeportText'
import IconFreeportCircle from '@/assets/icons/freeport-icons/IconFreeportCircle'

const SlideShowLogo = () => {
  return (
    <div className="absolute text-white freeport-logo overflow-hidden w-full h-[500px] flex justify-center items-center gap-x-2">
      <IconFreeportCircle className="w-8 h-8" />
      <FreeportLogoText className="w-[112px] h-[40px]" />
    </div>
  )
}

export default SlideShowLogo
