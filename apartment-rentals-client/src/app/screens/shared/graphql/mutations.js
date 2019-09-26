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
