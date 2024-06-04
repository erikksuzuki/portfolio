import { gsap } from 'gsap'

export function runBlockscopeAnimation(
  triggerRef: HTMLDivElement | undefined | null
) {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: triggerRef,
        start: 'center center',
        end: '1200 top',
        scrub: 0.6,
        pin: true,
      },
    })
    .to('.blockscope-logo', {
      opacity: '0',
      ease: 'none',
      duration: 1,
    })
    .to(
      '.blockscope-logo',
      {
        translateY: '-30px',
        ease: 'none',
        duration: 1,
      },
      '<'
    )
    .fromTo(
      '.icon-grid .icon-img',
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
    .to('.icon-grid .icon-img', {
      translateY: '30px',
      opacity: 0,
      ease: 'back',
      duration: 0.5,
    })
    .fromTo(
      '.code-section .code-lang-option',
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
      '.code-url',
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
    .to('.code-section', {
      translateY: '-36px',
      ease: 'back',
      duration: 2,
    })
    .fromTo(
      '.code-block',
      {
        translateY: '30px',
        opacity: 0,
      },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        duration: 0.5,
      },
      '<0.5'
    )
}
