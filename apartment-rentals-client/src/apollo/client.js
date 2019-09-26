import ApolloClient from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
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

// const httpLink = new HttpLink({

//   credentials: 'include',
// })

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('X-User-Token')
  const email = localStorage.getItem('X-User-Email')
  operation.setContext(() => {
    return {
      headers: {
        'X-User-Token': token,
        'x-User-Email': email,
      },
    }
  })
  return forward(operation)
})

export const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  uri: process.env.REACT_APP_API_URI,
  link: authLink,
  cache,
})
