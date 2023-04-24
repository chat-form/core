import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import 'antd/dist/reset.css'
import { useThemeCtx } from 'vite-pages-theme-doc'

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
    if (locale && !isLocaleReady) {
      navigate(`${locale.routePrefix}${location.pathname}`, {
        replace: true,
      })
    }
  }, [i18n, locale, isLocaleReady])

  return <>{isLocaleReady ? children : null}</>
}

export default Wrapper
