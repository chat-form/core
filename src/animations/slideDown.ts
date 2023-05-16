export const slideDown = (duration: number) => ({
  scrollFn: (dom: HTMLDivElement) => {
    dom.scrollIntoView({ behavior: 'smooth' })
  },
  enterAnimateFn: async (dom: HTMLDivElement) => {
    const height = (dom.firstChild as HTMLElement).clientHeight;
    dom.style.overflow = 'hidden';
    const animate = dom.animate([{ height: '0px' }, { height: `${height}px` }], {
      duration,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
    await animate.finished
    animate.cancel();
    dom.style.height = 'auto';
    dom.style.height = 'unset';
  },
  exitAnimateFn: async (dom: HTMLDivElement) => {
    const sibling = dom.previousSibling as HTMLDivElement
    if (sibling && sibling.classList.contains('changing')) {
      dom.style.opacity = '0';
      const height = (sibling.firstChild as HTMLElement).clientHeight;
      const animate = sibling.animate([{ height: '0px', overflow: 'hidden' }, { height: `${height}px`, overflow: 'hidden' }], {
        duration,
        fill: 'forwards',
        easing: 'ease-in-out'
      })
      animate.finished.finally(() => {
        animate.cancel();
        sibling.style.height = 'auto';
      })
    }
  },
})
