/**
 * @title Stress Test
 * @description Generate a lot of steps to test the fluency of animation.
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import { Card, Progress, Radio, Space } from 'antd'
import styles from './index.module.css'

export default () => {
  const [percent, setPercent] = React.useState(0)
  return (
    <>
      <Progress style={{ maxWidth: 500 }} percent={percent} />
      <SequenceCard
        containerClassName={styles.demo}
        onStepChange={(e, steps) => {
          const currentIndex = steps.findIndex((ele) => ele.id === e)
          setPercent(
            Math.max(0, Math.floor((currentIndex / steps.length) * 100))
          )
        }}
        initialSteps={[...Array(500).keys()].map((k) => `${k}`)}
        steps={[...Array(1000).keys()].map((key, index) => {
          return {
            id: `${key}`,
            renderStep: (ctx) =>
              ctx.isActive ? (
                <Card title={`Question ${key}`}>
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
                </Card>
              ) : (
                <Card
                  title={`Question ${key}`}
                  extra={
                    <div onClick={() => ctx.gotoStep(`${key}`, 48)}>Edit</div>
                  }
                >
                  Done
                </Card>
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
    </>
  )
}
