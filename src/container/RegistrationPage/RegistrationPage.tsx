import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@bem-react/classname'
import { Button, Link, TextField, Typography } from '@mui/material'

import './RegistrationPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  RegistrationFormFields,
  validateRegistrationForm,
} from 'helpers/validateRegistrationForm'
import { registration } from 'state/user/users.thunks'
import { AppDispatch } from 'state/store'
import {
  registrationInProgressSelector,
  registrationSuccessSelector,
} from 'state/user/user.selector'
import { clearRegistrationSuccess } from 'state/user/user.reducer'

const bem = cn('RegistrationPage')

export const RegistrationPage = () => {
  const [username, setUsername] = React.useState('')
  const [usernameError, setUsernameError] = React.useState(false)

  const [password, setPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState(false)

  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = React.useState(false)

  const [disabled, setDisabled] = React.useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const registrationSuccess = useSelector(registrationSuccessSelector)
  const registrationProgress = useSelector(registrationInProgressSelector)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.trim())
    setUsernameError(false)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim())
    setPasswordError(false)
  }

  const handlePasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirmation(event.target.value.trim())
    setPasswordConfirmationError(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const formValidation: boolean | RegistrationFormFields = validateRegistrationForm({
      username,
      password,
      confirmPassword: passwordConfirmation,
    })

    switch (formValidation) {
      case true:
        dispatch(registration({ username, password }))

        if (registrationSuccess) {
          navigate('/login')
        }
        break
      case RegistrationFormFields.USERNAME:
        setUsernameError(true)
        break
      case RegistrationFormFields.PASSWORD:
        setPasswordError(true)
        break
      case RegistrationFormFields.CONFIRM_PASSWORD:
        setPasswordConfirmationError(true)
        break
    }
  }

  const navigateToLogin = () => {
    navigate('/login')
    dispatch(clearRegistrationSuccess())
  }

  useEffect(() => {
    if (username.length > 0 && password.length > 0 && passwordConfirmation.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [username, password, passwordConfirmation])

  return !registrationSuccess ? (
    <div className={bem()}>
      <Typography
        variant="button"
        display="block"
        align="center"
        className={bem('Title')}
      >
        Registration
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          className={bem('TextField')}
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
          error={usernameError}
        />
        <Typography variant="subtitle2" gutterBottom color={'#1876d2'}>
          * at least 6 characters
        </Typography>
        <Typography variant="subtitle2" gutterBottom color={'#1876d2'}>
          * no spaces
        </Typography>

        <TextField
          className={bem('TextField')}
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <Typography variant="subtitle2" gutterBottom color={'#1876d2'}>
          * at least 3 characters
        </Typography>
        <Typography variant="subtitle2" gutterBottom color={'#1876d2'}>
          * no spaces
        </Typography>

        <TextField
          className={bem('TextField')}
          label="Confirm password"
          variant="outlined"
          fullWidth
          type="password"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          error={passwordConfirmationError}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={bem('RegistrationButton')}
          disabled={disabled || registrationProgress}
        >
          register
        </Button>
      </form>

      <div className={bem('Login')}>
        <Typography
          variant="button"
          display="block"
          align="center"
          className={bem('LoginText')}
        >
          already have an account?{' '}
        </Typography>
        <Link
          component="button"
          onClick={navigateToLogin}
          variant="button"
          className={bem('LoginLink')}
        >
          login
        </Link>
      </div>
    </div>
  ) : (
    <div className={bem()}>
      <Typography variant="overline" align="center" fontSize={'20px'}>
        Your account has been created!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={navigateToLogin}
        className={bem('RegistrationButton')}
      >
        Go to Login
      </Button>
    </div>
  )
}
