import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { errorLink, serverURI } from './config'

/**
 *  ref: https://github.com/apollographql/apollo-client-nextjs
 */
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: serverURI,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        // fetchOptions: { cache: "no-store" },
      }),
    ]),
  })
})
