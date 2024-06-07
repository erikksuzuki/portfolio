import { socialLinkData } from '@/app/socialLinkData'
import SocialLinks from '../../components/common/SocialLinks'

const Footer = () => {
  return (
    <footer className="bg-black">
      <main className="py-8 px-4 md:px-8 w-full mx-auto max-w-[1024px]">
        <SocialLinks
          data={socialLinkData}
          className="mt-4"
          label="Contact me at:"
        />
      </main>
    </footer>
  )
}

export default Footer
