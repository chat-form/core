import { useMemoizedFn, useLatest } from '@chat-form/core/hooks'
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { flushSync, unstable_batchedUpdates } from 'react-dom'
import classnames from 'classnames'
import './index.css'
import { getBem } from '@chat-form/core/utils/classname'

export interface Props {
  /** All available steps */
  steps: Step[]
  /** Array of initial step keys
   *  @defaultValue []
   */
  initialSteps?: string[]
  /** Slide in / slide out distance in px
   *  @defaultValue 200
   */
  animationOffsetRight?: number
  /** Card gap in px, the gap will be preserved after each scroll
   * @defaultValue 16
   */
  gap?: number
  /** Animation time in ms
   * @defaultValue 250
   */
  animationDuration?: number
  /** Customize scroll function
   *  @defaultValue dom.scrollIntoView
   */
  scrollFn?: (dom: HTMLDivElement, id: string) => void
  /** Container class name */
  containerClassName?: string
  /** Container style */
  containerStyle?: React.CSSProperties
}

export interface Ctx {
  /** Whether the current step is active */
  isActive: boolean
  /** Navigate to a specific step
   * @param id step id
   * @param delay animation delay in ms
   */
  gotoStep: (id: string, delay?: number) => void
  /** Scroll to a specific step, this action will not toggle active state
   * @param id step id
   */
  scrollToCard: (id?: string) => void
}

export interface Step {
  /** Unique key of the step */
  id: string
  /** Render function of the step */
  renderStep: (ctx: Ctx) => React.ReactNode
}

export interface ListRef {
  /** Navigate to a specific step
   * @param id step id
   * @param delay animation delay in ms
   */
  gotoStep: (id: string, delay?: number) => void
  /** Scroll to a specific step, this action will not toggle active state
   * @param id step id
   */
  scrollToCard: (id?: string) => void
}

const cs = getBem('sc')

export default forwardRef((props: Props, ref: Ref<ListRef>) => {
  const {
    steps: _steps = [],
    initialSteps = [],
    animationDuration: _animationDuration = 250,
    animationOffsetRight = 200,
    gap = 16,
    containerClassName,
    containerStyle,
    scrollFn: _scrollFn = (dom) => dom.scrollIntoView({ behavior: 'smooth' }),
  } = props
  const containerDom = useRef<HTMLDivElement>(null)
  const cardDoms = useRef<Record<string, HTMLDivElement | null>>({})
  const activeDom = useRef<HTMLDivElement>(null)
  const steps = useLatest(_steps)
  const [currentStep, setCurrentStep] = useState(() => {
    const lastKey = initialSteps[initialSteps.length - 1]
    if (lastKey) {
      return (
        steps.current[steps.current.findIndex((ele) => ele.id === lastKey) + 1]
          ?.id ?? _steps?.[0]?.id
      )
    }
    return _steps?.[0]?.id
  })
  const [prevSteps, setPrevSteps] = useState<string[]>(initialSteps)
  const [aboutToRemoveSteps, setAboutToRemoveSteps] = useState<string[]>([])
  const aboutToEditStep = useRef('')
  const [distanceBottom, setDistanceBottom] = useState(window.innerHeight)
  // set a minimum animation duration currently
  const animationDuration = useMemo(
    () => Math.max(_animationDuration, 48),
    [_animationDuration]
  )
  const scrollFn = useMemoizedFn(_scrollFn)

  const step = useMemo(() => {
    return steps.current.find((ele) => ele.id === currentStep)
  }, [currentStep, _steps])

  const findStep = useMemoizedFn((id?: string) => {
    if (!id) {
      return activeDom.current
    }
    const index = prevSteps.findIndex((ele) => ele === id)
    const prevStep =
      index > -1 ? prevSteps[index] : prevSteps[prevSteps.length - 1]
    return cardDoms.current[prevStep]
  })

  /** ensure bottom distance to fully display current step */
  const getContainerHeight = useMemoizedFn(() => {
    const containerHeight = Math.min(
      containerDom.current?.clientHeight || window.innerHeight,
      window.innerHeight
    )
    return containerHeight
  })

  /** ensure bottom distance to fully display current step */
  const getDistanceBottom = useMemoizedFn(() => {
    const containerHeight = getContainerHeight()
    const currentHeight = activeDom.current?.getBoundingClientRect().height || 0
    return Math.max(containerHeight - currentHeight, gap)
  })

  const scrollToCard = useMemoizedFn((id?: string) => {
    if (step) {
      const dom = findStep(id)
      if (dom) {
        flushSync(() => {
          setDistanceBottom(getDistanceBottom())
        })
        setTimeout(() => {
          scrollFn(dom, id ?? step.id)
        }, 16) // Safari need a slight delay to scroll correctly in edge cases
      }
    }
  })

  const gotoStep = useMemoizedFn((id: string, delay = 0) => {
    if (!id) {
      return
    }
    const exec = () => {
      const currentIndex = steps.current.findIndex(
        (ele) => ele.id === currentStep
      )
      const targetIndex = steps.current.findIndex((ele) => ele.id === id)
      if (currentIndex === targetIndex || targetIndex === -1) {
        return
      }
      if (currentIndex > targetIndex) {
        if (targetIndex === 0) {
          scrollFn(findStep(id)!, id)
        }
        aboutToEditStep.current = id || ''
        setDistanceBottom(getContainerHeight())
        setCurrentStep('')
        const index = prevSteps.findIndex((ele) => ele === id)
        setAboutToRemoveSteps([...prevSteps.filter((_, i) => i > index), id])
      } else {
        setCurrentStep(id)
        if (step) {
          setPrevSteps((s) => [...s, step.id])
        }
      }
    }
    setTimeout(exec, delay)
  })

  useImperativeHandle(
    ref,
    () => {
      return {
        gotoStep,
        scrollToCard,
      }
    },
    [gotoStep, scrollToCard]
  )

  const removeAnimate = useMemo(
    () => ({
      index: prevSteps.indexOf(
        aboutToRemoveSteps[aboutToRemoveSteps.length - 1] || ''
      ),
      delay: animationDuration / aboutToRemoveSteps.length,
    }),
    [prevSteps, aboutToRemoveSteps, animationDuration]
  )

  return (
    <div
      ref={containerDom}
      className={classnames(cs('container'), containerClassName)}
      style={{
        '--scroll-animation-offset-top': `${gap}px`,
        '--scroll-animation-offset-right': `${animationOffsetRight}px`,
        '--animation-duration': `${animationDuration}ms`,
        ...containerStyle,
      }}
    >
      {prevSteps.map((ele, index) => {
        const prevStep = steps.current.find((i) => i.id === ele)
        if (!prevStep) {
          return null
        }
        const isAboutToRemove = aboutToRemoveSteps.includes(prevStep.id)
        return (
          <div
            ref={(r) => (cardDoms.current[prevStep.id] = r)}
            key={prevStep?.id}
            className={cs('card-wrapper')}
          >
            <div
              style={{
                transform: `translateX(${
                  isAboutToRemove ? `${animationOffsetRight}px` : 0
                })`,
                transitionDelay: `${Math.min(
                  Math.max(
                    removeAnimate.delay * (index - removeAnimate.index),
                    0
                  ),
                  animationDuration
                )}ms`,
              }}
              className={cs('card')}
              onTransitionEnd={() => {
                unstable_batchedUpdates(() => {
                  setPrevSteps((s) => {
                    const needKeep = (id: string) =>
                      !aboutToRemoveSteps.includes(id)
                    const stepsLeft = s.filter(needKeep)
                    setAboutToRemoveSteps([])
                    return stepsLeft
                  })
                  setCurrentStep(aboutToEditStep.current)
                })
              }}
              key={prevStep.id}
            >
              {prevStep?.renderStep({
                gotoStep,
                scrollToCard,
                isActive: false,
              })}
            </div>
          </div>
        )
      })}
      <div
        key={step?.id}
        ref={activeDom}
        className={classnames(cs('card-wrapper'), cs('active'))}
      >
        <div
          onAnimationEnd={() => {
            scrollToCard()
          }}
          style={{
            opacity: step ? 1 : 0,
            marginBottom: distanceBottom,
          }}
          className={classnames(cs('fadeIn'), cs('card'))}
        >
          <div>
            {step?.renderStep?.({ gotoStep, scrollToCard, isActive: true })}
          </div>
        </div>
      </div>
    </div>
  )
})
