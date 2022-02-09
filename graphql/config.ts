import { HttpLink } from "@apollo/client";
import { GraphQLErrors, NetworkError } from "@apollo/client/errors";
import { onError } from '@apollo/client/link/error'

/**
 *  Apollo Link overview: https://www.apollographql.com/docs/react/api/link/introduction/
 *  TODO: HttpLink -> BatchHttpLink
 *  TOOD: err of different NODE_ENV and Authentication like login
 */
export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL
})

// TODO: snack by notistack.js
export const errorLink = onError(( {graphQLErrors, networkError} )=> {
  if (graphQLErrors) {
    graphQLErrors.forEach(err => {
      console.error(`[GraphQL error]: ${err.message}`)
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`)
  }
})

