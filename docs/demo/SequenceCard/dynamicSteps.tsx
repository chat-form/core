/**
 * @title Dynamic Adding Steps
 * @description After changing steps, you need to add a slight delay(or use flushSync) to make sure changed steps are loaded.
 */

import React, { useRef } from 'react'
import { SequenceCard } from '@chat-form/core'
import { slideIn } from '@chat-form/core/animations/slideIn'
import type { Ref } from '@chat-form/core/components/SequenceCard'
import styles from './index.module.css'
import { Button, Space, Radio, Form, Card } from 'antd'
import type { ad } from './mock/data'
import Json from '../../components/Json'
import FormValue from '../../components/FormValue'
import { flushSync } from 'react-dom'

export default () => {
  const [question, setQuestion] = React.useState<typeof ad>([])
  const ref = useRef<Ref | null>(null)
  const [form] = Form.useForm()

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

  return (
    <Form form={form}>
      <div style={{ overflow: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <Button
            onClick={() => {
              const id = pushRandomQuestion()
              ref.current?.gotoStep(id)
            }}
          >
            Insert a step
          </Button>
        </div>
        <SequenceCard
          ref={ref}
          containerClassName={styles.demo}
          steps={question.map((ele) => {
            return {
              id: ele.id,
              renderStep: (ctx) => {
                return ctx.isActive ? (
                  <Card title={ele.question}>
                    <Form.Item noStyle name={ele.id}>
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
                    </Form.Item>
                  </Card>
                ) : (
                  <Card
                    extra={<div onClick={() => ctx.gotoStep(ele.id)}>Edit</div>}
                    title={ele.question}
                  >
                    <Form.Item noStyle name={ele.id}>
                      <FormValue
                        formatter={(v) => (
                          <div
                            onClick={() => {
                              ctx.gotoStep(ele.id)
                            }}
                          >
                            {ele.answers.find((i) => i.key === v)?.name || '-'}
                          </div>
                        )}
                      />
                    </Form.Item>
                  </Card>
                )
              },
            }
          })}
          {...slideIn()}
          scrollFn={(dom) => {
            const sibling = dom.previousSibling as HTMLElement
            if (sibling) {
              dom.parentElement?.scrollTo({
                top: sibling.offsetTop,
                behavior: 'smooth',
              })
            } else {
              dom.parentElement?.scrollTo({
                top: 0,
              })
            }
          }}
        />
      </div>
      <Json
        width={500}
        json={
          <Form.Item shouldUpdate={() => true}>
            {() => JSON.stringify(form.getFieldsValue(true, () => true))}
          </Form.Item>
        }
      />
    </Form>
  )
}
