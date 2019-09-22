import React, { useState } from 'react'
import styled from 'styled-components'

import { SIZES } from '../../shared/general/constants'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

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

const LoginForm = () => (
  <React.Fragment>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <form noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
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

const SignUpForm = () => (
  <React.Fragment>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <form noValidate>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: 16 }}
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

const Login = props => {
  const [showLoginForm, setShowLoginForm] = useState(true)

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
        {showLoginForm ? <LoginForm /> : <SignUpForm />}
        <Link
          onClick={() => setShowLoginForm(!showLoginForm)}
          variant="body2"
          style={{ marginTop: SIZES['medium'] }}
        >
          {switchFormText}
        </Link>
      </FormWrapper>
    </LoginLayout>
  )
}

export default Login
