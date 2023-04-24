import React from 'react'
import { createTheme } from 'vite-pages-theme-doc'
import Wrapper from '.'

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>ChatForm</div>,
  search: false,
  AppWrapper: Wrapper,
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
  i18n: {
    defaultLocale: 'en',
    topBarLocaleSelector: true,
    locales: {
      en: {
        label: 'English',
        lang: 'en', // this will be set as the `lang` attribute on <html>
        routePrefix: '/en',
      },
      zh: {
        label: '中文',
        lang: 'zh-CN',
        routePrefix: '/zh',
      },
    },
  },
})
