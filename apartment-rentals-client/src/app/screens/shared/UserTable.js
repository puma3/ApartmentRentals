import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { USER_LIST_QUERY } from './graphql/queries'
import {
  REGISTER_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
} from './graphql/mutations'

import Table from './MaterialTable'

const userTableColumns = [
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Email Address', field: 'email', editable: 'onAdd' },
  {
    title: 'Role',
    field: 'role',
    lookup: { CLIENT: 'Client', REALTOR: 'Realtor' },
  },
]

const UserTable = ({ records, title, setError, role, ...props }) => {
  const { loading, data } = useQuery(USER_LIST_QUERY, {
    variables: {
      role: role,
    },
  })
  const refetchQueries = ['UserList']
  const [registerUserMutation] = useMutation(REGISTER_USER_MUTATION, {
    refetchQueries,
  })
  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries,
  })
  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries,
  })

  const registerUser = async newUser => {
    try {
      await registerUserMutation({
        variables: {
          input: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: 'testing',
          },
        },
      })
    } catch ({ graphQLErrors }) {
      setError(graphQLErrors[0].message)
    }
  }

  const updateUser = async updatedUser => {
    try {
      await updateUserMutation({
        variables: {
          input: {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
          },
        },
      })
    } catch ({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors)
      setError(graphQLErrors[0].message)
    }
  }

  const deleteUser = async deletedUser => {
    try {
      await deleteUserMutation({
        variables: {
          input: {
            email: deletedUser.email,
          },
        },
      })
    } catch ({ graphQLErrors }) {
      setError(graphQLErrors[0].message)
    }
  }

  return (
    <Table
      columns={userTableColumns}
      data={loading ? [] : data.users}
      title={title}
      isLoading={loading}
      options={{
        pageSize: 13,
        pageSizeOptions: [],
      }}
      editable={{
        onRowAdd: newUser =>
          new Promise((resolve, reject) => {
            registerUser(newUser)
            resolve()
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateUser(newData)
            resolve()
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteUser(oldData)
            resolve()
          }),
      }}
      {...props}
    />
  )
}

export default UserTable
