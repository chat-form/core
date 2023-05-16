export const fadeIn = (duration: number = 250) => ({
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
  exitAnimateFn: async (doms: HTMLDivElement[]) => {
    return Promise.all(doms.map((dom, index) => {
      return dom.animate([{ opacity: 1 }, { opacity: 0 }], {
        delay: duration / doms.length * (doms.length - index - 1),
        duration,
        fill: 'forwards',
      }).finished
    }))
  },
})
