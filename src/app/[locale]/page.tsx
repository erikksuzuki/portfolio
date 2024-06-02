import WorkGemini from '@/components/WorkGemini/WorkGemini'
import WorkFreeport from '@/components/WorkFreeport/WorkFreeport'
import WorkBlockscope from '@/components/WorkBlockscope/WorkBlockscope'
import WorkFreelance from '@/components/WorkFreelance'

// https://www.youtube.com/watch?v=PeFqGrEHnp0

export default function Home() {
  return (
    <main>
      <div className="bg-black">
        <main className="py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px]">
          <section className="text-left grid grid-cols-1">
            <div>
              <h1 className="text-theme-xs">Hi, my name is</h1>
              <h1 className="text-theme-heading-xs font-poppins mb-3">
                Eric Suzuki
              </h1>
              <p className="text-theme-sm font-exo">
                I&apos;m a Product Engineer experienced with complex
                Software-as-a-Service platforms, specializing in front-end
                architecture and building pixel-perfect, customized UI component
                libraries from the ground up using granular code.
                <br />
                <br />
                In the past decade, I&apos;ve worked with some trailblazing
                crypto-related companies such as Gemini and Freeport and my
                career has featured Web3 projects prominently. I&apos;m a major
                geek, sci-fi fan and film aficionado, and my other hobbies and
                interests include metaphysics, religion and rock music and
                literature.
              </p>
              <div className="mt-5 text-theme-sm">
                <h2>Technologies I work with most:</h2>
                <div className="mt-4 text-theme-xs text-[rgba(255,255,255,0.7)]">
                  <ul className="list-disc ml-4 grid grid-cols-3">
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
              </div>
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
      </div>
      <main className="py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px]">
        <div className="">
          <WorkBlockscope />
          <WorkFreeport />
          <WorkGemini />
          {/* <WorkFreelance /> */}
        </div>
      </main>
    </main>
  )
}
