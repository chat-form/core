/**
 * @title Dynamic Adding Steps
 * @description ref.gotoStep internally adding a slight delay, so after changing steps, you can call gotoStep with the latest step immediately
 */

import React, { useRef } from 'react'
import { SequenceCard } from '@chat-form/core'
import type { ListRef } from '@chat-form/core/components/SequenceCard'
import styles from './index.module.css'
import { Button, Space, Radio, Form } from 'antd'
import type { ad } from './mock/data'
import Json from '../../components/Json'
import FormValue from '../../components/FormValue'

export default () => {
  const [question, setQuestion] = React.useState<typeof ad>([])
  const ref = useRef<ListRef | null>(null)
  const [form] = Form.useForm()

  const pushRandomQuestion = () => {
    const id = `${Date.now()}`
    setQuestion((s) => [
      ...s,
      {
        id,
        question: `New Inserted Question ${id}`,
        answers: [
          {
            name: 'yes',
            key: 'yes',
            next: '',
          },
        ],
      },
    ])
    return id
  }

  return (
    <Form form={form}>
      <div style={{ overflow: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <Button
            onClick={() => {
              const id = pushRandomQuestion()
              ref.current?.gotoStep(id, 48)
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
                  <div className={styles.card}>
                    <div>{ele.question}</div>
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
                                  ctx.gotoStep(id, 48)
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
                  </div>
                ) : (
                  <div className={styles.card}>
                    <div>{ele.question}</div>
                    <Form.Item noStyle name={ele.id}>
                      <FormValue
                        formatter={(v) => (
                          <div
                            className={styles.result}
                            onClick={() => {
                              ctx.gotoStep(ele.id, 48)
                            }}
                          >
                            {ele.answers.find((i) => i.key === v)?.name || '-'}
                          </div>
                        )}
                      />
                    </Form.Item>
                  </div>
                )
              },
            }
          })}
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
