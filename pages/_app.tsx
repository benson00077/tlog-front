import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styled/golbalStyles'
import { useThemeMode } from '../hooks/useThemeMode'
import { darkTheme, lightTheme } from '../styled/theme'
import TogglerButton from '../components/TogglerButton/ToggleButton'



function MyApp({ Component, pageProps }: AppProps) {

  const { theme, themeToggler } = useThemeMode()
  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  const apolloStore = useApollo(pageProps)

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
