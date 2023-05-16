/**
 * @title Animations
 * @description We offer some built in animations for you to choose. You can also customize your own animations.
 */

import React, { useRef } from 'react'
import { SequenceCard } from '@chat-form/core'
import { slideIn } from '@chat-form/core/animations/slideIn'
import { slideDown } from '@chat-form/core/animations/slideDown'
import { fadeIn } from '@chat-form/core/animations/fadeIn'
import type { Ref } from '@chat-form/core/components/SequenceCard'
import styles from './index.module.css'
import { Button, Radio, Form, Card, Space } from 'antd'
import type { ad } from './mock/data'
import FormValue from '../../components/FormValue'
import { flushSync } from 'react-dom'

export default () => {
  const [question, setQuestion] = React.useState<typeof ad>([])
  const [animationName, setAnimationName] = React.useState('slideIn')
  const ref = useRef<Ref | null>(null)

  const pushRandomQuestion = () => {
    const id = `${question.length}`
    flushSync(() => {
      setQuestion((s) => [
        ...s,
        {
          id,
          question: `New Question ${id}`,
          answers: [
            {
              name: 'yes',
              key: 'yes',
              next: '',
            },
          ],
        },
      ])
    })
    return id
  }

  const animation = React.useMemo(() => {
    switch (animationName) {
      case 'fadeIn':
        return fadeIn
      case 'slideDown':
        return slideDown
      case 'noAnimation':
        return () => ({})
      case 'slideIn':
      default:
        return slideIn
    }
  }, [animationName])

  return (
    <div style={{ overflow: 'auto' }}>
      <Space>
        <Button
          onClick={() => {
            setAnimationName('slideIn')
            const id = pushRandomQuestion()
            ref.current?.gotoStep(id)
          }}
        >
          Slide In
        </Button>
        <Button
          onClick={() => {
            setAnimationName('fadeIn')
            const id = pushRandomQuestion()
            ref.current?.gotoStep(id)
          }}
        >
          Fade In
        </Button>
        <Button
          onClick={() => {
            setAnimationName('slideDown')
            const id = pushRandomQuestion()
            ref.current?.gotoStep(id)
          }}
        >
          Slide Down
        </Button>
        <Button
          onClick={() => {
            setAnimationName('noAnimation')
            const id = pushRandomQuestion()
            ref.current?.gotoStep(id)
          }}
        >
          No Animation
        </Button>
      </Space>

      <SequenceCard
        ref={ref}
        containerStyle={{ marginTop: 12 }}
        containerClassName={styles.demo}
        steps={question.map((ele) => {
          return {
            id: ele.id,
            renderStep: (ctx) => {
              return ctx.isActive ? (
                <Card title={ele.question}>
                  <Radio.Group
                    buttonStyle="solid"
                    className={styles.options}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical">
                      {ele.answers.map((i) => {
                        return (
                          <Radio.Button
                            onClick={() => {
                              const id = pushRandomQuestion()
                              ctx.gotoStep(id)
                            }}
                            key={i.key}
                            value={i.key}
                          >
                            {i.name}
                          </Radio.Button>
                        )
                      })}
                    </Space>
                  </Radio.Group>
                </Card>
              ) : (
                <Card
                  extra={<div onClick={() => ctx.gotoStep(ele.id)}>Edit</div>}
                  title={ele.question}
                >
                  Done
                </Card>
              )
            },
          }
        })}
        {...animation(250)}
        scrollFn={(dom) => {
          dom.parentElement?.scrollTo({
            top: dom.offsetTop,
            behavior: 'smooth',
          })
        }}
      />
    </div>
  )
}
