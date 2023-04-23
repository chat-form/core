/**
 * @title Stress Test
 * @description Generate a lot of steps to test the fluency of animation.
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import { Radio, Space } from 'antd'
import styles from './index.module.css'

export default () => {
  return (
    <SequenceCard
      containerClassName={styles.demo}
      initialSteps={[...Array(500).keys()].map((k) => `${k}`)}
      steps={[...Array(1000).keys()].map((key, index) => {
        return {
          id: `${key}`,
          renderStep: (ctx) =>
            ctx.isActive ? (
              <div className={styles.card}>
                <div>Question {key}:</div>
                <Radio.Group
                  buttonStyle="solid"
                  className={styles.options}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical">
                    {[...Array(((index % 3) + 1) * 4).keys()].map((ele) => {
                      return (
                        <Radio.Button
                          onClick={() => ctx.gotoStep(`${key + 1}`, 48)}
                          key={ele}
                          value={ele}
                        >
                          {key}-{ele}
                        </Radio.Button>
                      )
                    })}
                  </Space>
                </Radio.Group>
              </div>
            ) : (
              <div className={styles.card}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Question {key}:</div>
                  <div onClick={() => ctx.gotoStep(`${key}`)}>Edit</div>
                </div>
                <div>Done</div>
              </div>
            ),
        }
      })}
      scrollFn={(dom) => {
        dom.parentElement?.scrollTo({
          top: dom.offsetTop,
          behavior: 'smooth',
        })
      }}
    />
  )
}
