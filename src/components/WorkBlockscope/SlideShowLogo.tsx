import BlockscopeLogo from '@/assets/icons/blockscope-cube.svg'
import Image from 'next/image'

const SlideShowLogo = () => {
  return (
    <div className="blockscope-logo overflow-hidden w-full h-[500px] flex justify-center items-center gap-x-2">
      <Image
        src={BlockscopeLogo.src}
        alt="BlockscopeLogo"
        width={44}
        height={44}
      />{' '}
      <span className="font-poppins font-[800] text-theme-heading-xs">
        Blockscope
      </span>
    </div>
  )
}

export default SlideShowLogo
