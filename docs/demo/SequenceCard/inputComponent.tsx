/**
 * @title Integrate with different form components
 * @description customize form components
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import type { Ref } from '@chat-form/core/components/SequenceCard'
import styles from './index.module.css'
import { Spin, Form, Card, Button, Input, Select, Checkbox } from 'antd'
import type { ad } from './mock/data'
import Json from '../../components/Json'
import FormValue from 'docs/components/FormValue'

export default () => {
  const [steps, setSteps] = React.useState<typeof ad>([
    { id: '0', question: '0', answers: [] },
  ])
  const [loading, setLoading] = React.useState(false)
  const ref = React.useRef<Ref>(null)
  const [form] = Form.useForm()

  const onNext = async () => {
    setLoading(true)
    const id = `${steps.length}`
    await new Promise((res) => setTimeout(res, 800))
    setLoading(false)
    const next: (typeof ad)[number] = { id, question: id, answers: [] }
    setSteps((s) => [...s, next])
    ref.current?.gotoStep(id, 48)
  }

  return (
    <Form form={form}>
      <div style={{ overflow: 'auto' }}>
        <SequenceCard<{ loading: boolean }>
          ref={ref}
          extraCtx={{ loading }}
          containerClassName={styles.demo}
          steps={steps.map((i, index) => ({
            id: i.id,
            renderStep: (ctx) =>
              ctx.isActive ? (
                <Spin spinning={ctx.loading && ctx.isActive}>
                  <Card title={`Question ${i.question}:`}>
                    <Form.Item noStyle name={`Q${i.id}`}>
                      {index % 3 === 0 && <Input />}
                      {index % 3 === 1 && (
                        <Select onChange={onNext} style={{ width: '100%' }}>
                          <Select.Option value={1}>1</Select.Option>
                          <Select.Option value={2}>2</Select.Option>
                          <Select.Option value={3}>3</Select.Option>
                        </Select>
                      )}
                      {index % 3 === 2 && (
                        <Checkbox.Group>
                          <Checkbox value={1}>1</Checkbox>
                          <Checkbox value={2}>2</Checkbox>
                          <Checkbox value={3}>3</Checkbox>
                        </Checkbox.Group>
                      )}
                    </Form.Item>
                    {index % 3 !== 1 && (
                      <Button style={{ marginTop: 16 }} block onClick={onNext}>
                        Next
                      </Button>
                    )}
                  </Card>
                </Spin>
              ) : (
                <Card
                  extra={<div onClick={() => ctx.gotoStep(i.id, 48)}>Edit</div>}
                  title={`Question ${i.question}:`}
                >
                  <Form.Item noStyle name={`Q${i.id}`}>
                    <FormValue formatter={(v) => <div>{v}</div>} />
                  </Form.Item>
                </Card>
              ),
          }))}
          scrollFn={(dom) => {
            dom.parentElement?.scrollTo({
              top: dom.offsetTop,
              behavior: 'smooth',
            })
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
