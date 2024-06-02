import WorkGemini from '@/components/WorkGemini/WorkGemini'
import WorkFreeport from '@/components/WorkFreeport/WorkFreeport'
import WorkBlockscope from '@/components/WorkBlockscope/WorkBlockscope'
import WorkFreelance from '@/components/WorkFreelance'
import Footer from '@/components/Footer/Footer'
import SocialLinks from '@/components/Footer/SocialLinks'
import AsciiPortrait from '@/components/AsciiPortrait'

// https://www.youtube.com/watch?v=PeFqGrEHnp0

export default function Home() {
  return (
    <div>
      <main className="bg-black">
        <section className="text-left gap-y-6 grid grid-cols-1 md:grid-cols-2 py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px]">
          <div className="md:order-1 order-2">
            <h1 className="text-theme-xs">Hi, my name is</h1>
            <h1 className="text-theme-heading-sm font-exo mb-3">Eric Suzuki</h1>
            <p className="text-theme-sm font-exo opacity-[0.85]">
              I&apos;m a Product Engineer experienced with complex
              Software-as-a-Service platforms, specializing in front-end
              architecture and building pixel-perfect, customized UI component
              libraries from the ground up using granular code.
              <br />
              <br />
              In the past decade, I&apos;ve worked with some trailblazing
              crypto-related companies such as Gemini and Freeport and my career
              has featured Web3 projects prominently. I&apos;m a major geek,
              sci-fi fan and film aficionado, and my other hobbies and interests
              include metaphysics, religion, classic rock and literature.
            </p>
            <div className="mt-5 text-theme-sm">
              <h2>Technologies I work with most:</h2>
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
          <div className="md:order-2 order-1 flex justify-center items-center">
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
