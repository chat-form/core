import React from 'react'
import Comp from '@chat-form/core'
import { render } from '@testing-library/react'

describe('Comp', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should render', () => {
    const { container } = render(<Comp />)
    expect(container.children).toMatchSnapshot()
  })
})
