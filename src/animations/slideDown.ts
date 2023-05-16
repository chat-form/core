export const slideDown = (duration: number = 250) => ({
  scrollFn: (dom: HTMLDivElement) => {
    dom.scrollIntoView({ behavior: 'smooth' })
  },
  enterAnimateFn: async (dom: HTMLDivElement) => {
    const height = dom.clientHeight;
    dom.style.overflow = 'hidden';
    dom.style.height = '0';
    const animate = dom.animate([{ height: '0px' }, { height: `${height}px` }], {
      duration,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
    await animate.finished
    animate.cancel();
    dom.style.height = '';
    dom.style.overflow = '';
  },
  exitAnimateFn: async (doms: HTMLDivElement[]) => {
    const sibling = doms?.[0]?.previousElementSibling as HTMLDivElement
    if (sibling) {
      doms.forEach((dom) => dom.style.opacity = '0');
      sibling.style.overflow = 'hidden';
      const height = sibling.clientHeight;
      const animate = sibling.animate([{ height: '0px', overflow: 'hidden' }, { height: `${height}px`, overflow: 'hidden' }], {
        duration,
        fill: 'forwards',
        easing: 'ease-in-out'
      })
      await animate.finished.finally(() => {
        animate.cancel();
        sibling.style.overflow = '';
        sibling.style.height = '';
      })
    }
  },
})
