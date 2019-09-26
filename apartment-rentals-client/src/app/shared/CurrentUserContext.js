import React, { createContext } from 'react'
import { CURRENT_USER_QUERY } from '../screens/shared/graphql/queries'
import { useQuery } from '@apollo/react-hooks'

const CurrentUserContext = createContext({
  currentUser: null,
})

export const CurrentUserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY)

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: data && data.currentUser }}
    >
      {loading ? null : children}
    </CurrentUserContext.Provider>
  )
}

export const CurrentUserConsumer = CurrentUserContext.Consumer
