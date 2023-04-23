import React from 'react'

interface Props {
  json: React.ReactNode
  width?: number
}

export default (props: Props) => {
  return (
    <pre
      style={{
        maxWidth: props.width,
        whiteSpace: 'pre-wrap',
        background: 'rgba(0,0,0,0.02)',
        margin: '8px 0',
        padding: 8,
        borderRadius: 4,
      }}
    >
      {props.json}
    </pre>
  )
}
