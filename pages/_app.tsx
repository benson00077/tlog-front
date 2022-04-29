import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styled/golbalStyles'
import { useThemeMode } from '../hooks/useThemeMode'
import { darkTheme, lightTheme } from '../styled/theme'
import TogglerButton from '../components/TogglerButton/ToggleButton'
import { useEffect, useState } from 'react'
import { Layout } from '../containers/Layout/Layout'
import { AnimatePresence } from 'framer-motion'

/**
 *  NOTICE:
 *      <Component key={...}> for <AnimatePresence> detecting exit animation of page transiion
 */
function MyApp({ Component, pageProps, router }: AppProps) {

  const { theme, themeToggler } = useThemeMode()
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;
  
  const apolloStore = useApollo(pageProps)
  
  /**
   *  DEPRECATED.
   *  NOTICE: 
   *      this block is for Progress Bar when page transition, just in case you need
   */
  const [isPageTransitit, setIsPageTransit] = useState(false);
  useEffect(() => {
    const handleStart = (url: string) => {
      // console.log(new Date, `Loading Start: ${url}`)
      // NProgress.start()
      setIsPageTransit(true)
    }
    const handleStop = () => {
      // console.log(new Date, `Loading Stop`)
      // NProgress.done()
      setIsPageTransit(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router.events])

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <ApolloProvider client={apolloStore}>
          <TogglerButton themeToggler={themeToggler} />
          <Layout>
            <>
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <Component {...pageProps} key={`KeyForAnimatePresence_${router.route}`} />
              </AnimatePresence>
            </>
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
