import WorkGemini from '@/components/WorkGemini/WorkGemini'
import WorkFreeport from '@/components/WorkFreeport/WorkFreeport'
import WorkBlockscope from '@/components/WorkBlockscope/WorkBlockscope'
import Footer from '@/components/Footer/Footer'
import SocialLinks from '@/components/Footer/SocialLinks'
import AsciiPortrait from '@/components/AsciiPortrait'
import { useTranslations } from 'next-intl'
import LanguagePicker from '@/components/common/LanguageSwitcher'

export default function Home() {
  const t = useTranslations('header')
  return (
    <div>
      <main className="bg-black">
        <section className="text-left gap-y-6 grid grid-cols-1 md:grid-cols-2 py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px] relative">
          <div className="absolute top-24 right-4">
            <LanguagePicker />
          </div>
          <div className="md:order-1 order-2">
            <h1 className="text-theme-xs">{t('introduction.heading')}</h1>
            <h1 className="text-theme-heading-sm mb-3">
              {t('introduction.name')}
            </h1>
            <p className="text-theme-sm opacity-[0.85] mb-4">
              {t('introduction.description')}
            </p>
            <p className="text-theme-sm opacity-[0.85]">
              {t('introduction.description2')}
            </p>
            <div className="mt-5 text-theme-sm">
              <h2>{t('introduction.technologyline')}</h2>
              <ul className="list-disc ml-4 grid grid-cols-3 mt-4 text-theme-xs text-[rgba(255,255,255,0.7)]">
                <li className="mb-2">React</li>
                <li className="mb-2">Next.js 14</li>
                <li className="mb-2">Tailwind CSS</li>
                <li className="mb-2">Supabase</li>
                <li className="mb-2">Vercel</li>
                <li className="mb-2">Contentful</li>
                <li className="mb-2">Gsap</li>
                <li className="mb-2">Framer Motion</li>
                <li className="mb-2">Mantine UI</li>
              </ul>
            </div>
            <SocialLinks className="mt-4" />
          </div>
          <div className="md:order-2 order-1 flex flex-col justify-center items-center">
            <AsciiPortrait />
          </div>
        </section>
        {/* 
      <section className="text-left mb-8">
        <h1 className="text-theme-heading-xs font-poppins mb-3">
          Recent Blog Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-md border border-white">some content</div>
          <div className="p-4 rounded-md border border-white">some content</div>
          <div className="p-4 rounded-md border border-white">some content</div>
        </div>
      </section>

      */}
      </main>
      <main className="py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px]">
        <div className="">
          <WorkBlockscope />
          <WorkFreeport />
          <WorkGemini />
          {/* <WorkFreelance /> */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
