import QRCode from 'react-qr-code'

const LinkTreeQRCodePage = () => {
  return (
    <div className="py-8 px-4 md:px-8 w-full mx-auto max-w-[1024px] flex items-center justify-center h-[calc(100dvh-140px)]">
      <QRCode
        value={'https://linktr.ee/erikksuzuki'}
        bgColor="rgba(255,255,255,0.9)"
        fgColor="transparent"
      />
    </div>
  )
}

export default LinkTreeQRCodePage
