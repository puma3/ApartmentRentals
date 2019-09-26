import React, { createContext, useState } from 'react'
import { CURRENT_USER_QUERY } from '../screens/shared/graphql/queries'
import { useQuery } from '@apollo/react-hooks'

const CurrentUserContext = createContext({
  currentUser: null,
  updateCurrentUser: () => {},
})

export const CurrentUserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  console.log('CURRENT_USER_QUERY', data)
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const CurrentUserConsumer = CurrentUserContext.Consumer
