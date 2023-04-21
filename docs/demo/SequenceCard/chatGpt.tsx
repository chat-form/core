/**
 * @title Integrate with ChatGPT
 * @description Let ChatGPT decide the questions and answers. This is just a heuristic example.
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import styles from './index.module.css'
import { json } from './mockdata'

export default () => {
  const [question, setQuestion] = React.useState(json)
  const [value, setValue] = React.useState<Record<string, string>>({})
  const [intention, setIntention] = React.useState('回收二手手机')
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(0)

  return (
    <>
      <div style={{ overflow: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <span>Your intention:</span>
          <input
            style={{ margin: '0 8px' }}
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={async () => {
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
                  setValue({})
                  setLoading(false)
                }
              } finally {
                setLoading(false)
              }
            }}
          >
            Generate Questions
          </button>
        </div>
        <SequenceCard
          key={key}
          containerClassName={styles.demo}
          steps={question.map((ele) => {
            return {
              id: ele.id,
              renderStep: (ctx) => {
                return ctx.isActive ? (
                  <div>
                    <div>{ele.question}</div>
                    {ele.answers.map((i, index) => (
                      <div
                        key={i.key}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setValue((v) => ({ ...v, [ele.id]: i.key }))
                          ctx.gotoStep(i.next, 48)
                        }}
                      >
                        - {i.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div onClick={() => ctx.gotoStep(ele.id, 48)}>
                    <div>{ele.question}</div>
                    <div>
                      {ele.answers.find((i) => i.key === value[ele.id])?.name}
                    </div>
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
            }
          }}
        />
      </div>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(value)}</pre>
    </>
  )
}
