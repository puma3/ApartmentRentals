import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'

import schema from './schema.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema,
})

const cache = new InMemoryCache({
  fragmentMatcher,
  dataIdFromObject: object => object.id || null,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    // headers: {
    //   ...headers,
    //   authorization: token ? `Bearer ${token}` : '',
    // },
    headers: {
      ...headers,
      authorization: 'Atoken',
      custom: 'Some text',
    },
  }
})

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      const token = localStorage.getItem('X-User-Token')
      const email = localStorage.getItem('X-User-Email')
      operation.setContext(() => {
        return {
          headers: {
            'X-User-Token': token,
            'X-User-Email': email,
          },
        }
      })
      return forward(operation)
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: process.env.REACT_APP_API_URI,
      credentials: 'include',
    }),
  ]),
})
