import { Props } from "../components/SequenceCard"

export const slideIn = (duration: number = 250): Props['animationFn'] => {
  return async ({ aboutToEnter, aboutToLeave }) => {
    if (aboutToEnter.length > 0) {
      const [dom] = aboutToEnter;
      await dom.animate([{ transform: `translateX(${dom.clientWidth / 2}px)` }, { transform: 'translateX(0)' }], {
        duration,
        fill: 'forwards',
      }).finished
    }
    if (aboutToLeave.length > 0) {
      await Promise.all(aboutToLeave.map((dom, index) => {
        return dom.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${dom.clientWidth / 2}px)` }], {
          delay: duration / aboutToLeave.length * (aboutToLeave.length - index - 1),
          duration,
          fill: 'forwards',
        }).finished.finally(() => {
          dom.style.opacity = '0';
        });
      }));
    }
  }
}