import ArmsAndTheManScreenshot from '@/assets/freelance/armsandtheman.png'
import sixteennineproductions from '@/assets/freelance/169productions.png'
import IchikawaEbizoScreenshot from '@/assets/freelance/ebizo2014.png'
import GameXScreenshot from '@/assets/freelance/gamex.png'
import Image from 'next/image'

const SlideShowScreenshots = () => {
  return (
    <div className="absolute overflow-hidden w-full h-[500px] flex justify-center items-center gap-x-2">
      <div className="absolute min-w-[420px] h-[420px] opacity-0 armsandtheman">
        <Image
          className="w-[420px] h-[420px]"
          alt="Arms And The Man"
          src={ArmsAndTheManScreenshot.src}
          width={420}
          height={420}
        />
      </div>
      <div className="absolute min-w-[420px] h-[420px] opacity-0 sixteennine">
        <Image
          className="w-[420px] h-[420px]"
          alt="sixteennine"
          src={sixteennineproductions.src}
          width={420}
          height={420}
        />
      </div>
      <div className="absolute min-w-[420px] h-[420px] opacity-0 gamex">
        <Image
          className="w-[420px] h-[420px]"
          alt="GameX Comex Convention"
          src={GameXScreenshot.src}
          width={420}
          height={420}
        />
      </div>
      <div className="absolute min-w-[420px] h-[420px] opacity-0 ebizo">
        <Image
          className="w-[420px] h-[420px]"
          alt="Ichikawa Ebizo XI's Japan Theater"
          src={IchikawaEbizoScreenshot.src}
          width={420}
          height={420}
        />
      </div>
    </div>
  )
}

export default SlideShowScreenshots
