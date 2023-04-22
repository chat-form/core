/**
 * @title Custom scroll behavior
 * @description Keep previous step in view when scroll to next step.
 */

import React from 'react'
import { SequenceCard } from '@chat-form/core'
import styles from './index.module.css'
import { json } from './mockdata'

export default () => {
  const [value, setValue] = React.useState<Record<string, string>>({})
  return (
    <>
      <SequenceCard
        containerClassName={styles.demo}
        steps={json.map((ele) => {
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
                        if (i.next === 'brand') {
                          setValue({})
                          ctx.scrollToCard('brand')
                          ctx.gotoStep(i.next, 48)
                          return
                        }
                        setValue((v) => ({ ...v, [ele.id]: i.key }))
                        ctx.gotoStep(i.next, 48)
                      }}
                    >
                      - {i.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div>{ele.question}</div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {ele.answers.find((i) => i.key === value[ele.id])?.name}
                    <div onClick={() => ctx.gotoStep(ele.id, 48)}>点击修改</div>
                  </div>
                </div>
              )
            },
          }
        })}
        scrollFn={(dom, id) => {
          if (id === 'brand') {
            dom.parentElement!.scrollTop = 0
          }
          const sibling = dom.previousSibling as HTMLElement
          if (sibling) {
            dom.parentElement?.scrollTo({
              top: sibling.offsetTop,
              behavior: 'smooth',
            })
          }
        }}
      />
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(value)}</pre>
    </>
  )
}
