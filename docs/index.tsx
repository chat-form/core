import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import 'antd/dist/reset.css'
import { useThemeCtx } from 'vite-pages-theme-doc'

const localeKey = '__DOC_LOCALE'

const Wrapper: React.ComponentType<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const {
    resolvedLocale: { locale },
    themeConfig: { i18n },
  } = useThemeCtx()
  const navigate = useNavigate()

  const isLocaleReady = useMemo(() => {
    return Object.values(i18n?.locales || {}).some((v) => {
      return location.pathname.startsWith(v.routePrefix || '-')
    })
  }, [locale])

  useEffect(() => {
    if (isLocaleReady) {
      localStorage.setItem(localeKey, locale?.lang || '')
    }
    if (!isLocaleReady) {
      const current = localStorage.getItem(localeKey) || locale?.lang
      const prefix =
        Object.values(i18n?.locales || {}).find((i) => i.lang === current)
          ?.routePrefix || ''
      navigate(`${prefix}${location.pathname}`, {
        replace: true,
      })
    }
  }, [i18n, locale, isLocaleReady])

  return <>{isLocaleReady ? children : null}</>
}

export default Wrapper
