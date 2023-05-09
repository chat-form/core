import { useMemoizedFn } from '@chat-form/core/hooks'
import React, { useEffect } from 'react'

import { noop } from 'lodash-es'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  animation?: boolean
  transition?: boolean
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
  children: React.ReactNode
}

export default (props: Props) => {
  const {
    animation = false,
    transition = false,
    onAnimationStart = noop,
    onAnimationEnd = noop,
    onTransitionStart = noop,
    onTransitionEnd = noop,
    children,
    ...rest
  } = props

  const animationStart = useMemoizedFn(onAnimationStart)
  const animationEnd = useMemoizedFn(onAnimationEnd)
  const transitionStart = useMemoizedFn(onTransitionStart)
  const transitionEnd = useMemoizedFn(onTransitionEnd)

  useEffect(() => {
    animationStart()
    if (!animation) {
      animationEnd()
    }
  }, [animation])

  useEffect(() => {
    transitionStart()
    if (!transition) {
      transitionEnd()
    }
  }, [transition])

  return (
    <div
      onTransitionEnd={transition ? transitionEnd : noop}
      onAnimationEnd={animation ? animationEnd : noop}
      {...rest}
    >
      {children}
    </div>
  )
}
