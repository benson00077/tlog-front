import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styled/golbalStyles'
import { useThemeMode } from '../hooks/useThemeMode'
import { darkTheme, lightTheme } from '../styled/theme'
import TogglerButton from '../components/TogglerButton/ToggleButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PreLoader from '../components/PreLoader/PreLoader'
import { Layout } from '../containers/Layout/Layout'


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const [isPageTransitit, setIsPageTransit] = useState(false);

  const { theme, themeToggler } = useThemeMode()
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  const apolloStore = useApollo(pageProps)

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
          {isPageTransitit
            ? (
              <Layout>
                <PreLoader></PreLoader>
              </Layout>
            )
            : (<Component {...pageProps} />)}
          {/* <Component {...pageProps} /> */}
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
