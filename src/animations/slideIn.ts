export const slideIn = (duration: number) => ({
  scrollFn: (dom: HTMLDivElement) => {
    dom.scrollIntoView({ behavior: 'smooth' })
  },
  enterAnimateFn: async (dom: HTMLDivElement) => {
    const animate = dom.animate([{ transform: 'translateX(200px)' }, { transform: 'translateX(0)' }], {
      duration,
      fill: 'forwards',
    })

    await animate.finished;
  },
  exitAnimateFn: async (dom: HTMLDivElement) => {
    const animate = dom.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(200px)' }], {
      duration,
      fill: 'forwards',
    })

    await animate.finished
  },
})