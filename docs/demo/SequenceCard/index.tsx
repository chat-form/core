/**
 * @title Sequence Card
 * @description Basic usage
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import styles from './index.module.css'

export default () => {
  return (
    <SequenceCard
      containerClassName={styles.demo}
      initialSteps={[...Array(20).keys()].map((k) => `${k}`)}
      steps={[...Array(100).keys()].map((key) => {
        return {
          id: `${key}`,
          renderStep: (ctx) =>
            ctx.isActive ? (
              <>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <div>Question {key}:</div>
                  </div>
                  {[1, 2, 3].map((ele) => (
                    <div
                      key={ele}
                      onClick={() => ctx.gotoStep(`${key + 1}`, 48)}
                    >
                      <input type="checkbox" value={`${key}-${ele}`} />
                      {key}-{ele}
                    </div>
                  ))}
                </div>
                <button
                  style={{ marginTop: 16 }}
                  onClick={() => ctx.gotoStep(`${key + 1}`)}
                >
                  Next
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
                  <div>Question {key}:</div>
                  <div onClick={() => ctx.gotoStep(`${key}`)}>Edit</div>
                </div>
                <div>Done</div>
              </>
            ),
        }
      })}
      scrollFn={(dom) => {
        dom.parentElement?.scrollTo({
          top: dom.offsetTop,
          // scroll to the previous element
          // top: (dom.previousElementSibling as HTMLElement).offsetTop,
          behavior: 'smooth',
        })
      }}
    />
  )
}
