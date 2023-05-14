export const fadeIn = (duration: number) => ({
  scrollFn: (dom: HTMLDivElement) => {
    dom.scrollIntoView({ behavior: 'smooth' })
  },
  enterAnimateFn: async (dom: HTMLDivElement) => {
    const animate = dom.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration,
      fill: 'forwards',
    })
    await animate.finished
  },
  exitAnimateFn: async (dom: HTMLDivElement) => {
    const animate = dom.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      fill: 'forwards',
    })
    await animate.finished
  },
})
