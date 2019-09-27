import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'

import { SIZES } from '../../shared/general/constants'
import { CURRENT_USER_QUERY } from '../shared/graphql/queries'
import {
  SIGN_IN_USER_MUTATION,
  REGISTER_USER_MUTATION,
} from '../shared/graphql/mutations'
import currentUserUtils from '../../shared/utils/currentUser'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Snackbar } from '@material-ui/core'

const LoginLayout = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  height: 100%;
`

const MainPic = styled.div`
  background-image: url(https://source.unsplash.com/random);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px ${SIZES['ultra']} auto ${SIZES['ultra']};
`

const LoginForm = ({ onError, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInUserMutation, { client }] = useMutation(SIGN_IN_USER_MUTATION)

  const signInUser = async () => {
    try {
      const {
        data: {
          signInUser: { user },
        },
      } = await signInUserMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      })

      setPassword('')
      currentUserUtils.setHeaders(user)

      client.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: user },
      })

      history.push('/')
    } catch ({ graphQLErrors }) {
      onError(graphQLErrors[0].message)
    }
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault()
          signInUser()
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: SIZES['medium'] }}
        >
          Sign In
        </Button>
      </form>
    </React.Fragment>
  )
}

const SignUpForm = ({ backToLogin, onError }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerUserMutation, { client }] = useMutation(REGISTER_USER_MUTATION)

  const registerUser = async () => {
    try {
      await registerUserMutation({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
          },
        },
      })

      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')

      backToLogin()
      onError('You are registered now!')
    } catch ({ graphQLErrors }) {
      onError(graphQLErrors[0].message)
    }
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault()
          registerUser()
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: 16,
          }}
        >
          <TextField
            autoComplete="fname"
            margin="normal"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: SIZES['medium'] }}
        >
          Sign Up
        </Button>
      </form>
    </React.Fragment>
  )
}

const Login = ({ history, ...props }) => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [error, setError] = useState(null)

  let switchFormText = showLoginForm
    ? "Don't have an account? Sign Up"
    : 'Already have an account? Sign in'

  return (
    <LoginLayout>
      <MainPic />
      <FormWrapper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        {showLoginForm ? (
          <LoginForm onError={setError} history={history} />
        ) : (
          <SignUpForm
            onError={setError}
            backToLogin={() => setShowLoginForm(true)}
          />
        )}
        <Link
          onClick={() => setShowLoginForm(!showLoginForm)}
          variant="body2"
          style={{ marginTop: SIZES['medium'] }}
        >
          {switchFormText}
        </Link>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          variant="error"
          open={Boolean(error)}
          message={error}
          onClose={() => setError(null)}
        />
      </FormWrapper>
    </LoginLayout>
  )
}

export default Login
