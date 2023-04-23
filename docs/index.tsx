import React from 'react'
import './index.css'
import 'antd/dist/reset.css'

const Wrapper: React.ComponentType<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <>{children}</>
}

export default Wrapper
