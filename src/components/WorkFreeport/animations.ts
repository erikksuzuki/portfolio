import { gsap } from 'gsap'

export function runFreeportAnimations() {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: '.freeport-trigger',
        start: 'center center',
        end: '1200 top',
        scrub: 0.6,
        pin: true,
      },
    })
    .to('.freeport-logo', {
      opacity: '0',
      translateY: '-30px',
      ease: 'none',
      duration: 1,
    })
    .fromTo(
      '#freeport-marilyn-img',
      { translateY: '-120px', opacity: 0 },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      }
    )
    .fromTo(
      '#freeport-marilyn-price',
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      }
    )
    .fromTo(
      '#freeport-marilyn-artist',
      { translateY: '30px', opacity: 0 },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      },
      '<0.2'
    )
    .fromTo(
      '#freeport-marilyn-title',
      { translateY: '30px', opacity: 0 },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      },
      '<0.2'
    )
    .fromTo(
      '#freeport-marilyn-description',
      { translateY: '30px', opacity: 0 },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      },
      '<0.2'
    )
    .fromTo(
      '#freeport-marilyn',
      { translateX: '0px', opacity: 1 },
      {
        translateX: '-120px',
        opacity: 0,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      }
    )
    .fromTo(
      '.freeport-purchase-section',
      { translateX: '-120px', opacity: 0 },
      {
        translateX: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 1,
      }
    )
    .fromTo(
      '.step-dot',
      { translateX: '30px', opacity: 0 },
      {
        translateX: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.2,
        duration: 3,
      },
      '<'
    )
    .fromTo(
      '.step-line',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
      },
      '<1'
    )
    .fromTo(
      '.fp-purchase-line',
      { translateY: '30px', opacity: 0 },
      {
        translateY: '0px',
        opacity: 1,
        ease: 'back',
        stagger: 0.1,
        duration: 0.5,
      },
      '<0.2'
    )
}
