import { Props } from "../components/SequenceCard"

export const slideDown = (duration: number = 250): Props['animationFn'] => {
  return async ({ aboutToEnter, aboutToLeave, aboutToActive, aboutToInActive }) => {
    if (aboutToEnter.length > 0) {
      const [dom] = aboutToEnter;
      const [inactive] = aboutToInActive;
      if (!dom) {
        return;
      }

      dom.style.opacity = "0"

      inactive?.animate?.([{ height: `${inactive.clientHeight * 1.2}px` }, { height: `${inactive.clientHeight}px` }], {
        duration: duration,
        fill: 'forwards',
      })

      const animate = dom.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: duration / 2,
        duration: duration / 2,
        fill: 'forwards',
      })

      await animate.finished.finally(() => {
        animate.cancel();
        dom.style.opacity = ""
      })
    }
    if (aboutToLeave.length > 0) {
      aboutToLeave.forEach((dom) => dom.style.opacity = '0');
      const [dom] = aboutToActive;
      if (!dom) {
        return;
      }

      dom.style.overflow = 'hidden';
      const height = dom.clientHeight;
      const animate = dom.animate([{ height: `${height * 0.5}px`, overflow: 'hidden' }, { height: `${height}px`, overflow: 'hidden' }], {
        duration,
        fill: 'forwards',
        easing: 'ease-in-out'
      })
      await animate.finished.finally(() => {
        animate.cancel();
        dom.style.overflow = '';
        dom.style.height = '';
      })
    }
  }
}
