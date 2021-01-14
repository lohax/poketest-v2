import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>, div)
})
