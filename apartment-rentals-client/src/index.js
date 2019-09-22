import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './apollo/client'
import * as serviceWorker from './serviceWorker'

import App from './app/index'

const render = Root => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>,
    document.getElementById('root'),
  )
}

render(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
