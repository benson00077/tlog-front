/**
 *  @deprecated
 */
import { ApolloClient, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { NextApiRequest, NextApiResponse } from 'next'
import { useMemo } from 'react'
import merge from 'deepmerge'
import { errorLink, httpLink } from './config'
import isEqual from 'lodash/isEqual'
/**
 *  My FINAL solution refer to
 *  - https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
 *
 *  Coping w/ the duplicate logic of ssr (server side) and apollo useQuery cache (in client side)
 *  - source: https://github.com/shshaw/next-apollo-ssr/blob/main/data/apollo.js
 *  - explain: https://javascript.plainenglish.io/configuring-and-using-the-apollo-client-in-a-next-js-typescript-application-9de6b2258943
 *
 *  about isomorphic 同構渲染
 *  - source: https://www.zhihu.com/question/325952676
 *
 *  about NOT use getDataFromTree
 *  - Downside: but you need to remember to prefetch everything you need on getStaticProps/getServerSideProps and match the exact same queries/variables
 *  - source: https://stackoverflow.com/questions/68848346/apollo-client-in-next-js-with-next-with-apollo-vs-the-approach-shown-in-next-j
 */
const isServer = typeof window === 'undefined'
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

export interface GraphQLContext {
  req: NextApiRequest
  res: NextApiResponse
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

/**
 *  Usage: in Client side
 */
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const apolloStore = useMemo(() => initializeApollo(state), [state])
  return apolloStore
}
