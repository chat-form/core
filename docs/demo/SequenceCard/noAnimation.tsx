/**
 * @title Disable Animation
 * @description Disable default animation and implement your own
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import { Button, Card, Progress, Radio, Space } from 'antd'
import styles from './index.module.css'

export default () => {
  return (
    <>
      <SequenceCard
        containerClassName={styles.demo}
        initialSteps={[...Array(5).keys()].map((k) => `${k}`)}
        animation={false}
        steps={[...Array(20).keys()].map((key, index) => {
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
                    <Button onClick={() => ctx.gotoStep(`${key + 1}`)}>
                      Next
                    </Button>
                  </Radio.Group>
                </Card>
              ) : (
                <Card
                  title={`Question ${key}`}
                  extra={<div onClick={() => ctx.gotoStep(`${key}`)}>Edit</div>}
                >
                  Done
                </Card>
              ),
          }
        })}
        scrollFn={() => {}}
      />
    </>
  )
}
