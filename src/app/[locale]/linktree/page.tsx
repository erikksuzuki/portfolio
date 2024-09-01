import Link from 'next/link'
import QRCode from 'react-qr-code'

const LinkTreeQRCodePage = () => {
  return (
    <div className="py-8 px-4 md:px-8 w-full mx-auto max-w-[1024px] flex flex-col gap-y-3 items-center justify-center h-[calc(100dvh-140px)]">
      <QRCode
        value={'https://linktr.ee/erikksuzuki'}
        bgColor="rgba(255,255,255,0.9)"
        fgColor="transparent"
      />
      <Link
        href="https://linktr.ee/erikksuzuki"
        target="_blank"
        className="text-theme-xs mt-3 py-1 px-2 border rounded-md text-[rgba(255,255,255,0.8)] border-[rgba(255,255,255,0.4)]"
      >
        https://linktr.ee/erikksuzuki
      </Link>
    </div>
  )
}

export default LinkTreeQRCodePage
