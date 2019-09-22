import ApolloClient from 'apollo-boost'
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

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI,
  cache,
})
