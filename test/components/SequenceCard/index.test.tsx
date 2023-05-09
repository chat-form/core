import React, { RefObject } from 'react'
import { SequenceCard } from '@chat-form/core'
import { render, screen, act } from '@testing-library/react'
import { Ref } from '@chat-form/core/components/SequenceCard'

const getStep = async (step: number, active: boolean) => {
  return await screen.findByText(`${step}-${active ? 'active' : 'inActive'}`)
}

describe('SequenceCard', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('initial steps', async () => {
    render(
      <SequenceCard
        initialSteps={[...Array(3).keys()].map((k) => `s${k}`)}
        steps={[...Array(100).keys()].map((key) => {
          return {
            id: `s${key}`,
            renderStep: (ctx) =>
              ctx.isActive ? (
                <>
                  <div onClick={() => ctx.gotoStep(`s${key + 1}`)}>
                    {key}-active
                  </div>
                </>
              ) : (
                <>
                  <div onClick={() => ctx.gotoStep(`s${key}`)}>
                    {key}-inActive
                  </div>
                </>
              ),
          }
        })}
      />
    )
    expect(await getStep(0, false)).toBeInTheDocument()
    expect(await getStep(1, false)).toBeInTheDocument()
    expect(await getStep(2, true)).toBeInTheDocument()
  })

  it('goto next step', async () => {
    let ref: RefObject<Ref> = { current: null }
    render(
      <SequenceCard
        // @ts-ignore
        ref={(r) => (ref.current = r)}
        initialSteps={[...Array(11).keys()].map((k) => `s${k}`)}
        steps={[...Array(100).keys()].map((key) => {
          return {
            id: `s${key}`,
            renderStep: (ctx) =>
              ctx.isActive ? (
                <>
                  <div onClick={() => ctx.gotoStep(`s${key + 1}`)}>
                    {key}-active
                  </div>
                </>
              ) : (
                <>
                  <div onClick={() => ctx.gotoStep(`s${key}`)}>
                    {key}-inActive
                  </div>
                </>
              ),
          }
        })}
      />
    )
    const step10Active = await getStep(10, true)
    const step9InActive = await getStep(9, false)
    expect(step10Active).toBeInTheDocument()
    expect(step9InActive).toBeInTheDocument()
    step10Active.click()
    const step11Active = await getStep(11, true)
    expect(step11Active).toBeInTheDocument()
    expect(await getStep(10, false)).toBeInTheDocument()
    const doms = ref.current?.getCards?.()
    expect(Object.keys(doms || {}).length).toEqual(12)
  })
})
