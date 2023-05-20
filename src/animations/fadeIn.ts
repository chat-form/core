import { Props } from "../components/SequenceCard"

export const fadeIn = (duration: number = 250): Props['animationFn'] => {
  return async ({ aboutToEnter, aboutToLeave }) => {
    if (aboutToEnter.length > 0) {
      await aboutToEnter[0].animate([{ opacity: 0 }, { opacity: 1 }], {
        duration,
        fill: 'forwards',
      }).finished;
    }
    if (aboutToLeave.length > 0) {
      await Promise.all(aboutToLeave.map((dom, index) => {
        return dom.animate([{ opacity: 1 }, { opacity: 0 }], {
          delay: duration / aboutToLeave.length * (aboutToLeave.length - index - 1),
          duration,
          fill: 'forwards',
        }).finished
      }))
    }
  }
}