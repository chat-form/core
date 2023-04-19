import React from 'react'
import { createTheme } from 'vite-pages-theme-doc'

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>ChatForm</div>,
  topNavs: [
    {
      label: 'Github',
      href: 'https://github.com/chat-form/core',
    },
    {
      label: 'NPM',
      href: 'https://www.npmjs.com/package/@chat-form/core',
    },
  ],
})
