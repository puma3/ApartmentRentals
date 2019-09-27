import gql from 'graphql-tag'

export const SIGN_IN_USER_MUTATION = gql`
  mutation SignInUser($input: SignInUserInput!) {
    signInUser(input: $input) {
      user {
        firstName
        lastName
        email
        role
        authenticationToken
      }
    }
  }
`

export const REGISTER_USER_MUTATION = gql`
  mutation CreateUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        firstName
        lastName
        email
        role
      }
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        firstName
        lastName
        email
        role
      }
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      success
    }
  }
`

export const CREATE_APARTMENT_MUTATION = gql`
  mutation CreateApartment($input: CreateApartmentInput!) {
    createApartment(input: $input) {
      apartment {
        id
        address
        available
        description
        floorAreaSize
        latitude
        longitude
        name
        numberOfRooms
        pricePerMonth
        realtor {
          email
          firstName
          lastName
          __typename
        }
      }
    }
  }
`

export const UPDATE_APARTMENT_MUTATION = gql`
  mutation UpdateApartment($input: UpdateApartmentInput!) {
    updateApartment(input: $input) {
      apartment {
        id
        address
        available
        description
        floorAreaSize
        latitude
        longitude
        name
        numberOfRooms
        pricePerMonth
      }
    }
  }
`

export const DELETE_APARTMENT_MUTATION = gql`
  mutation DeleteApartment($input: DeleteApartmentInput!) {
    deleteApartment(input: $input) {
      success
    }
  }
`
