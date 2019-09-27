import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      firstName
      lastName
      email
      role
    }
  }
`

export const USER_LIST_QUERY = gql`
  query UserList($role: UserRole) {
    users(role: $role) {
      email
      firstName
      lastName
      role
    }
  }
`

export const APARTMENTS_QUERY = gql`
  query ApartmentList {
    apartments {
      id
      name
      address
      pricePerMonth
      available
      description
      numberOfRooms
      floorAreaSize
      latitude
      longitude
      realtor {
        email
        firstName
        lastName
      }
    }
  }
`
