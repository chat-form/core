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
      initialSteps={[...Array(20).keys()].map((k) => `s${k}`)}
      steps={[...Array(100).keys()].map((key) => {
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
                  <div>Question ${key}:</div>
                  <div onClick={() => ctx.gotoStep(`s${key}`)}>Edit</div>
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
