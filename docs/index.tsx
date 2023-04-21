import React from 'react'
import './index.css'

const Wrapper: React.ComponentType<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <>{children}</>
}

export default Wrapper
