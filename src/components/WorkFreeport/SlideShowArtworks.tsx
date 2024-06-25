import FreeportLogoText from '@/assets/icons/freeport-icons/IconFreeportText'
import IconFreeportCircle from '@/assets/icons/freeport-icons/IconFreeportCircle'
import Image from 'next/image'

import ArtMarilyn from '@/assets/freeport/marilyn.jpg'
import ArtMickJagger from '@/assets/freeport/mickjagger.jpg'
import ArtRebelWithoutACause from '@/assets/freeport/rebelwithoutacause.jpg'
import DoubleMickey from '@/assets/freeport/doublemickey.jpg'
import { type ReactNode } from 'react'

interface ArtWorkDisplayProps {
  imgSrc: string
  title: string
  priceUSD: number
  id: string
  children: ReactNode
}
const ArtWorkDisplay = ({
  imgSrc,
  title,
  priceUSD,
  id,
  children,
}: ArtWorkDisplayProps) => {
  function formatPrice() {
    const priceDollars = priceUSD.toString().split('.')[0]
    const priceCents = priceUSD.toString().split('.')[1]
    if (!priceCents) return `$${priceDollars}`
    if (priceCents.length === 2) return `$${priceUSD.toString()}`
    return `$${priceDollars}.${priceCents}0`
  }
  return (
    <div className="w-[288px] font-roboto" id={id}>
      <div
        id={`${id}-img`}
        className="w-[288px] h-[288px] rounded-md overflow-hidden mb-4 shadow-lg relative"
      >
        <div
          id={`${id}-price`}
          className="text-theme-sm font-roboto absolute bottom-[4px] left-[4px] py-1 px-2 bg-[rgba(0,0,0,0.8)] rounded-md"
        >
          From <span className="font-semibold">{formatPrice()}</span>
        </div>
        <Image src={imgSrc} alt={title} width={288} height={288} />
      </div>
      <h2
        id={`${id}-artist`}
        className="uppercase text-theme-xs tracking-wide font-medium mb-2"
      >
        Andy Warhol
      </h2>
      <h1 id={`${id}-title`} className="font-bold text-theme-lg mb-2">
        {title}
      </h1>
      <p id={`${id}-description`} className="text-theme-sm font-light">
        {children}
      </p>
    </div>
  )
}

const SlideShowArtworks = () => {
  return (
    <div className="absolute text-white overflow-hidden w-full h-[500px] flex justify-center items-center gap-x-2">
      <ArtWorkDisplay
        title="Marilyn, 1967"
        priceUSD={531.8}
        imgSrc={ArtMarilyn.src}
        id="freeport-marilyn"
      >
        A timeless hot pink Marilyn, the most famous and recognizable subject of
        Andy Warhol&apos;s works
      </ArtWorkDisplay>
      {/*
      <ArtWorkDisplay title="Mick Jagger, 1975" imgSrc={ArtMarilyn.src}>
        Depiction of the legendary Mick Jagger with striking signatures from
        both Warhol and Jagger
      </ArtWorkDisplay>
      <ArtWorkDisplay
        title="Rebel Without a Cause, 1985"
        imgSrc={ArtMarilyn.src}
      >
        A striking depiction of the heroic James Dean from the
        &quot;Advertisements&quot; series
      </ArtWorkDisplay>
      <ArtWorkDisplay title="Double Mickey, 1981" imgSrc={ArtMarilyn.src}>
        An exceedingly rare screen print with scintillating diamond dust #3/25
      </ArtWorkDisplay>
      */}
    </div>
  )
}

export default SlideShowArtworks
