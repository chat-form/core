/**
 * @title Integrate with ChatGPT
 * @description Let ChatGPT decide the questions and answers. This is just a heuristic example.
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import { slideDown } from '@chat-form/core/animations/slideDown'
import styles from './index.module.css'
import { Input, Button, Space, Radio, Form, Card } from 'antd'
import { ad } from './mock/data'
import Json from '../../components/Json'
import FormValue from '../../components/FormValue'

export default () => {
  const [question, setQuestion] = React.useState(ad)
  const [intention, setIntention] = React.useState('回收二手手机')
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(0)
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <div style={{ overflow: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input.Search
              addonBefore="Your intention:"
              style={{ width: 500 }}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              onSearch={async () => {
                setLoading(true)
                try {
                  const res = await fetch(`https://api.chat-form.io/`, {
                    method: 'POST',
                    body: JSON.stringify({
                      // TODO: prompt user to enter their own token
                      token: 'sk-123456',
                      intention: intention,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                  if (res.status === 200) {
                    const data = await res.json()
                    setQuestion(data)
                    setKey((k) => k + 1)
                    form.resetFields()
                    setLoading(false)
                  }
                } finally {
                  setLoading(false)
                }
              }}
              enterButton={
                <Button loading={loading} type="default">
                  Generate
                </Button>
              }
            />
          </Space.Compact>
        </div>
        {loading && (
          <div style={{ marginBottom: 16 }}>
            Please wait and notice that ChatGPT may generate incorrect result in
            some cases
          </div>
        )}
        <SequenceCard
          key={key}
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
                                onClick={() => ctx.gotoStep(i.next, 48)}
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
                    extra={
                      <div onClick={() => ctx.gotoStep(ele.id, 48)}>Edit</div>
                    }
                    title={ele.question}
                  >
                    <Form.Item noStyle name={ele.id}>
                      <FormValue
                        formatter={(v) => (
                          <div>
                            {ele.answers.find((i) => i.key === v)?.name}
                          </div>
                        )}
                      />
                    </Form.Item>
                  </Card>
                )
              },
            }
          })}
          {...slideDown()}
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
