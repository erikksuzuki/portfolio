import BitriaAccountCard from '@/components/BitriaAccountCard'
import GeminiLogo from '@/assets/geminiBitriaLogo.png'
import WorkGemini from '@/components/WorkGemini/WorkGemini'
import WorkFreeport from '@/components/WorkFreeport/WorkFreeport'
import WorkBlockscope from '@/components/WorkBlockscope/WorkBlockscope'
import WorkFreelance from '@/components/WorkFreelance'

// https://www.youtube.com/watch?v=PeFqGrEHnp0

export default function Home() {
  return (
    <main className="py-24 px-4 md:px-8 w-full mx-auto max-w-[1024px] border border-white">
      <section className="text-center mb-8">
        <h1 className="text-theme-xs mb-2">Full Stack Web Developer</h1>
        <h1 className="text-theme-xl md:text-theme-heading-md font-poppins mb-3">
          Transforming Ideas into Elegant Products
        </h1>
        <h1 className="text-theme-xs md:text-theme-md font-exo">
          Hi, I`m Eric, a Next.js Developer based in Las Vegas
        </h1>
      </section>
      <section className="text-left grid grid-cols-1 md:grid-cols-2 mb-8">
        <div>
          <h1 className="text-theme-heading-xs font-poppins mb-3">About Me</h1>
          <p className="text-theme-sm font-exo">
            Eric is a Product Engineer experienced in building complex
            Software-as-a-Service platforms, specializing in front-end
            architecture and building pixel-perfect, customized UI component
            libraries from the ground up using granular code. In the past
            decade, He&apos;s worked with trailblazing crypto-related companies
            such as Gemini and Freeport to improve the experience of their
            platforms. He&apos;s a major geek, sci-fi fan and film aficionado,
            and his other hobbies and interests include metaphysics, religion
            and classic rock and literature. He gets his greatest sense of
            achievement building and developing things that have a lasting
            impact.
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
        <div className="px-4">asdfasdf</div>
      </section>
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
      <section className="text-left mb-8">
        <h1 className="text-theme-heading-xs font-poppins mb-3">
          Work Experience
        </h1>
      </section>
      <div className="">
        <WorkBlockscope />
        <WorkFreeport />
        <WorkGemini />
        <WorkFreelance />
      </div>
    </main>
  )
}
