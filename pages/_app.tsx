import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'
import { createGlobalStyle } from 'styled-components'
import { GlobalStyle } from './golbalStyles'


function MyApp({ Component, pageProps }: AppProps) {

  const apolloStore = useApollo(pageProps)

  return (
    <>
      <GlobalStyle />
      <ApolloProvider client={apolloStore}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
