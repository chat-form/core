export const slideIn = (duration: number = 250) => ({
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
  exitAnimateFn: async (doms: HTMLDivElement[]) => {
    await Promise.all(doms.map((dom, index) => {
      return dom.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(200px)' }], {
        delay: duration / doms.length * (doms.length - index - 1),
        duration,
        fill: 'forwards',
      }).finished;
    }));
  },
})