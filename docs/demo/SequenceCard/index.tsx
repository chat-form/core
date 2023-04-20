import React from 'react'
import { SequenceCard } from '@chat-form/core'

export default () => {
  return (
    <SequenceCard
      containerStyle={{
        width: 300,
        height: 500,
        border: '1px solid #e8e8e8',
        background: 'rgba(0,0,0,0.02)',
        padding: '0 16px',
      }}
      initialSteps={[...Array(100).keys()].map((k) => `s${k}`)}
      steps={[...Array(888).keys()].map((key) => {
        return {
          id: `s${key}`,
          renderStep: (ctx) =>
            ctx.isActive ? (
              <>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <div>Question ${key}:</div>
                  </div>
                  <div onClick={() => ctx.gotoStep(`s${key + 1}`, 48)}>
                    <input type="checkbox" value={`${key}-1`} />
                    {key}-1
                  </div>
                  <div onClick={() => ctx.gotoStep(`s${key + 1}`, 48)}>
                    <input type="checkbox" value={`${key}-2`} />
                    {key}-2
                  </div>
                  <div onClick={() => ctx.gotoStep(`s${key + 1}`, 48)}>
                    <input type="checkbox" value={`${key}-3`} />
                    {key}-3
                  </div>
                </div>
                <button
                  style={{ marginTop: 16 }}
                  onClick={() => ctx.gotoStep(`s${key + 1}`)}
                >
                  确认
                </button>
              </>
            ) : (
              <>
                <div
                  style={{
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Question ${key}:</div>
                  <div onClick={() => ctx.gotoStep(`s${key}`)}>Edit</div>
                </div>
                <div>Done</div>
              </>
            ),
        }
      })}
      animationDuration={250}
      gap={16}
    />
  )
}
