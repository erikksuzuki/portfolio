import { gsap } from 'gsap'

export function runFreelanceAnimations(
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
    .to('.freelance-logo', {
      opacity: '0',
      translateY: '-30px',
      ease: 'none',
      duration: 1,
    })
    .to('.armsandtheman', {
      opacity: '1',
      translateX: '0px',
      ease: 'none',
      duration: 1,
    })
    .to('.armsandtheman', {
      opacity: '0',
      translateX: '-50px',
      ease: 'none',
      delay: 3,
      duration: 1,
    })
    .to('.sixteennine', {
      opacity: '1',
      translateX: '0px',
      ease: 'none',
      duration: 1,
    })
    .to('.sixteennine', {
      opacity: '0',
      translateX: '-50px',
      ease: 'none',
      delay: 3,
      duration: 1,
    })
    .to('.gamex', {
      opacity: '1',
      translateX: '0px',
      ease: 'none',
      duration: 1,
    })
    .to('.gamex', {
      opacity: '0',
      translateX: '-50px',
      ease: 'none',
      delay: 3,
      duration: 1,
    })
    .to('.ebizo', {
      opacity: '1',
      translateX: '0px',
      ease: 'none',
      duration: 1,
    })
}
