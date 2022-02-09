import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo'

function MyApp({ Component, pageProps }: AppProps) {

  const apolloStore = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloStore}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
