import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styled/golbalStyles'
import { useThemeMode } from '../hooks/useThemeMode'
import { darkTheme, lightTheme } from '../styled/theme'
import TogglerButton from '../components/TogglerButton/ToggleButton'
import { useEffect } from 'react'
import { useRouter } from 'next/router'



function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const { theme, themeToggler } = useThemeMode()
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  const apolloStore = useApollo(pageProps)

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`)
      // NProgress.start()
    }
    const handleStop = () => {
      // NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ApolloProvider client={apolloStore}>
        <TogglerButton themeToggler={themeToggler}/>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
    </>
  )
}

export default MyApp
