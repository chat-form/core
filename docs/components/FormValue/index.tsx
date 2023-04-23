import React from 'react'

interface Props {
  value?: any
  formatter: (v?: any) => React.ReactNode
}

const FormValue: React.FC<Props> = (props) => {
  return <>{props.formatter(props.value)}</>
}

export default FormValue
