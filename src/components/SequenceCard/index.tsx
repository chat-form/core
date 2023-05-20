import {
  useMemoizedFn,
  useLatest,
  useCallbackState,
} from '@chat-form/core/hooks'
import useSize from '@chat-form/core/hooks/useSize'
import { getBem } from '@chat-form/core/utils'
import classNames from 'classnames'
import React, {
  forwardRef,
  memo,
  Ref as ReactRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import './index.css'

const asyncNoop = () => Promise.resolve()

export interface Props<ExtraCtx extends Record<any, any> = {}> {
  /** extra ctx that render function need to response to
   *  @defaultValue {}
   */
  extraCtx?: ExtraCtx
  /** All available steps */
  steps: Step<ExtraCtx>[]
  /** Array of initial step keys，the last one will be the currently active step
   *  @defaultValue []
   */
  initialSteps?: string[]
  /** Card gap in px, the gap will be preserved after each scroll
   * @defaultValue 16
   */
  gap?: number
  /** Customize scroll function
   *  @defaultValue dom.scrollIntoView
   */
  scrollFn?: (dom: HTMLDivElement, id: string) => void
  /** Customize enter animate function
   *  @defaultValue no animation
   */
  animationFn?: (params: {
    aboutToEnter: HTMLDivElement[]
    aboutToLeave: HTMLDivElement[]
    aboutToActive: HTMLDivElement[]
    aboutToInActive: HTMLDivElement[]
    stepDoms: Record<string, HTMLDivElement>
  }) => Promise<void> | void
  /** step change callback
   *  @defaultValue noop
   */
  onStepChange?: (key: string, steps: Step<ExtraCtx>[]) => void
  /** Container class name */
  containerClassName?: string
  /** Container style */
  containerStyle?: React.CSSProperties
}

export interface Ctx {
  /** Whether the current step is active */
  isActive: boolean
  /** Whether the current step is about to enter and start entering animation */
  isAboutToEnter: boolean
  /** Whether the current step is about to exit and start leaving animation */
  isAboutToExit: boolean
  /** Whether the current step is switching state from active to inactive */
  isPreviousActiveStep: boolean
  /** Whether the current step is switching state from inactive to active */
  isPreviousInactiveStep: boolean
  /** Navigate to a specific step
   * @param id step id
   * @param delay animation delay in ms
   */
  gotoStep: (id: string, delay?: number) => void
}

export interface Step<T extends Record<any, any> = Record<any, any>> {
  /** Unique key of the step */
  id: string
  /** Render function of the step */
  renderStep: (ctx: Ctx & T) => React.ReactNode
}

export interface Ref {
  /** Navigate to a specific step
   * @param id step id
   * @param delay animation delay in ms
   */
  gotoStep: (id: string, delay?: number) => void
  /** Scroll to a specific step, this action will not toggle active state
   * @param id step id
   */
  scrollToStep: (id?: string) => void
  /**
   * A map of step id to card dom
   */
  getCards: () => Record<string, HTMLDivElement | null>
  /**
   * get the reference of the bottom distance dom
   */
  getBottomDom: () => HTMLDivElement | null
  /**
   * greatly increase distance bottom to prevent scroll position blinking when active step height changes
   */
  unstable_lockHeightBounceForAShortTime: () => void
}

type SequenceCard<T extends Object = {}> = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<Props<T> & React.RefAttributes<Ref>>
>

const cs = getBem('sc')

const _SequenceCard = forwardRef((props: Props, ref: ReactRef<Ref>) => {
  const {
    gap = 16,
    initialSteps,
    onStepChange = asyncNoop,
    steps: _steps = [],
    extraCtx = {},
    scrollFn = (dom) => {
      dom.scrollIntoView({ behavior: 'auto' })
    },
    animationFn = asyncNoop,
  } = props

  const stepDoms = useRef<Record<string, HTMLDivElement>>({})
  const containerDom = useRef<HTMLDivElement>(null)
  const distanceDom = useRef<HTMLDivElement>(null)
  const allSteps = useLatest(_steps)
  const [aboutToEnter, setAboutToEnter] = useCallbackState<Step[]>([])
  const [aboutToExit, setAboutToExit] = useCallbackState<Step[]>([])
  const [steps, setSteps] = useState<Step[]>(() => {
    return (
      initialSteps
        ? allSteps.current.filter((ele) => initialSteps?.includes(ele.id))
        : [allSteps.current[0]]
    ).filter(Boolean)
  })
  const afterEnterCallback = useRef(asyncNoop)
  const afterExitCallback = useRef(asyncNoop)
  const navigateDirection = useRef<'forward' | 'backward'>('forward')
  const animationLock = useRef(Promise.resolve())

  const getLastActiveStep = useMemoizedFn(() => {
    const aboutToExitIds = aboutToExit.map((ele) => ele.id)
    const last = steps
      .filter((ele) => !aboutToExitIds.includes(ele.id))
      .slice(-1)[0]

    return last
  })

  const getLastActiveStepDom = useMemoizedFn(() => {
    return stepDoms.current?.[getLastActiveStep()?.id!]
  })

  const { height: activeStepHeight = 0 } = useSize(getLastActiveStepDom) || {}

  const lockHeightBounceForAShortTime = useMemoizedFn(() => {
    if (distanceDom.current) {
      distanceDom.current.style.marginBottom = '99999999px'

      setTimeout(() => {
        if (distanceDom.current) {
          distanceDom.current.style.marginBottom = '0'
          distanceDom.current.style.height = `${Math.max(
            getContainerHeight() - (getLastActiveStepDom()?.clientHeight || 0),
            gap
          )}px`
        }
      }, 200)
    }
  })

  const scrollToStep = useMemoizedFn((id?: string) => {
    const last = getLastActiveStep()
    const scrollToId = id ?? last.id

    if (last) {
      if (stepDoms.current[scrollToId]) {
        scrollFn(stepDoms.current[scrollToId]!, scrollToId)
      }
    }
  })

  const getDoms = useMemoizedFn((steps: Step[]) => {
    return steps.map((ele) => stepDoms.current[ele.id]).filter(Boolean)
  })

  const getAboutToInactiveStep = useMemoizedFn(() => {
    if (navigateDirection.current === 'forward') {
      return steps[steps.length - 2] ?? steps[steps.length - 1]
    }
  })

  const getAboutToActiveStep = useMemoizedFn(() => {
    if (navigateDirection.current === 'backward') {
      return steps[steps.length - aboutToExit.length - 1]
    }
  })

  // enter animation
  useLayoutEffect(() => {
    if (aboutToEnter && aboutToEnter.length) {
      animationLock.current = new Promise<void>(async (resolve) => {
        await animationFn({
          stepDoms: stepDoms.current!,
          aboutToEnter: getDoms(aboutToEnter),
          aboutToLeave: [],
          aboutToActive: [],
          aboutToInActive: getDoms([getAboutToInactiveStep()!]),
        })
        await afterEnterCallback.current()
        resolve()
      }).finally(() => {
        scrollToStep()
      })
    }
  }, [aboutToEnter])

  // leaving animation
  useLayoutEffect(() => {
    if (aboutToExit && aboutToExit.length) {
      animationLock.current = new Promise<void>(async (resolve) => {
        await animationFn({
          stepDoms: stepDoms.current!,
          aboutToEnter: [],
          aboutToLeave: getDoms(aboutToExit),
          aboutToActive: getDoms([getAboutToActiveStep()!]),
          aboutToInActive: [],
        })
        resolve()
      }).finally(() => {
        afterExitCallback.current()
        scrollToStep()
      })
    }
  }, [aboutToExit])

  useEffect(() => {
    const initialActive = getLastActiveStep()?.id
    if (initialActive) {
      scrollToStep(initialActive)
      onStepChange(initialActive, allSteps.current)
    }
  }, [])

  const gotoStep = useMemoizedFn(async (id: string, delay = 0) => {
    await new Promise((res) => setTimeout(res, delay))
    await animationLock.current
    const targetIndex = allSteps.current.findIndex((ele) => ele.id === id)
    const lastIndex = allSteps.current.findIndex(
      (ele) => ele.id === steps[steps.length - 1]?.id
    )

    if (targetIndex !== -1 && targetIndex !== lastIndex) {
      // move forward
      if (targetIndex > lastIndex) {
        navigateDirection.current = 'forward'
        await afterEnterCallback.current()
        unstable_batchedUpdates(() => {
          setAboutToEnter([allSteps.current[targetIndex]])
          setSteps((s) => {
            const next = [...s, allSteps.current[targetIndex]]
            return next
          })
          onStepChange(id, allSteps.current)
        })
        afterEnterCallback.current = async () => {
          afterEnterCallback.current = asyncNoop
          await new Promise<any>((res) => {
            setAboutToEnter([], res)
          })
        }
      } else {
        // move backward
        navigateDirection.current = 'backward'
        await afterExitCallback.current()
        unstable_batchedUpdates(() => {
          const nextAboutToExit = allSteps.current
            .filter((_, index) => index > targetIndex)
            .filter((ele) => steps.find((step) => step.id === ele.id))

          setAboutToExit(nextAboutToExit)
        })

        afterExitCallback.current = async () => {
          afterExitCallback.current = asyncNoop
          return new Promise<any>((res) => {
            unstable_batchedUpdates(() => {
              setSteps((s) => {
                const next = s.filter((_) => {
                  const index = allSteps.current.findIndex((e) => e.id === _.id)
                  return index !== -1 && index <= targetIndex
                })
                return next
              })
              setAboutToExit([], res)
              onStepChange(id, allSteps.current)
            })
          })
        }
      }
    }
  })

  /** ensure bottom distance to fully display current step */
  const getContainerHeight = useMemoizedFn(() => {
    const containerHeight = Math.min(
      containerDom.current?.clientHeight || window.innerHeight,
      window.innerHeight
    )
    return containerHeight
  })

  useImperativeHandle(
    ref,
    () => ({
      gotoStep,
      scrollToStep,
      getCards: () => stepDoms.current,
      getBottomDom: () => distanceDom.current,
      unstable_lockHeightBounceForAShortTime: lockHeightBounceForAShortTime,
    }),
    []
  )

  return (
    <div
      style={props.containerStyle}
      ref={containerDom}
      className={classNames(cs('container'), props.containerClassName)}
    >
      {steps.map((step, index, arr) => {
        const isLast = index === arr.length - 1
        const isAboutToEnter = !!aboutToEnter.find((ele) => ele.id === step.id)
        const isAboutToExit = !!aboutToExit.find((ele) => ele.id === step.id)
        const isPreviousInactiveStep = getAboutToActiveStep()?.id === step.id
        const isPreviousActiveStep = getAboutToInactiveStep()?.id === step.id
        const isActive = isLast || isPreviousInactiveStep

        return (
          <div
            ref={(r) => {
              if (r) {
                stepDoms.current[step.id] = r
              }
            }}
            key={step.id}
            data-step-id={step.id}
            className={classNames(
              cs('card-wrapper'),
              isAboutToEnter && 'entering',
              isAboutToExit && 'leaving',
              isActive && 'active',
              isPreviousActiveStep && 'previous-active',
              isPreviousInactiveStep && 'previous-inactive'
            )}
          >
            <div
              className={cs('card')}
              style={{
                paddingTop: gap,
              }}
            >
              {step.renderStep({
                isAboutToEnter,
                isAboutToExit,
                isPreviousActiveStep,
                isPreviousInactiveStep,
                isActive,
                gotoStep,
                ...extraCtx,
              })}
            </div>
          </div>
        )
      })}
      <div
        ref={distanceDom}
        style={{
          height: Math.max(getContainerHeight() - activeStepHeight, gap),
        }}
      />
    </div>
  )
}) as SequenceCard<{}>

// TODO: find a better way to type this
export const SequenceCard = memo(_SequenceCard) as <
  ExtraCtx extends Record<any, any> = {}
>(
  ...args: Parameters<SequenceCard<ExtraCtx>>
) => ReturnType<SequenceCard<ExtraCtx>>
