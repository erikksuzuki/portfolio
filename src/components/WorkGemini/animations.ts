import { gsap } from 'gsap'

export function runGeminiAnimations() {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: '.gemini-trigger',
        start: 'center center',
        end: '1200 top',
        scrub: 0.6,
        pin: true,
      },
    })
    .to('.gemini-logo', {
      opacity: '0',
      translateY: '-30px',
      ease: 'none',
      duration: 1,
    })
    .fromTo(
      '.gemini-account-header',
      {
        translateY: '30px',
        opacity: 0,
      },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 0.5,
      }
    )
    .fromTo(
      '.gemini-account-card',
      {
        translateY: '30px',
        opacity: 0,
      },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 0.5,
      }
    )
    .fromTo(
      '.gemini-account-add',
      {
        translateY: '30px',
        opacity: 0,
      },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        duration: 0.5,
      }
    )
    .to('.gemini-onboarding', {
      translateY: '-76px',
      ease: 'back',
      duration: 2,
    })
}
