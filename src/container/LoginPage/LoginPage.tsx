import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cn } from '@bem-react/classname'
import Link from '@mui/material/Link'

import { inProgressSelector, userErrorSelector } from 'state/user/user.selector'
import { AppDispatch } from 'state/store'
import { login } from 'state/user/users.thunks'
import './LoginPage.scss'

const bem = cn('LoginPage')

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [disabled, setDisabled] = useState(false)

  const progress = useSelector(inProgressSelector)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.trim())
    console.log(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim())
    console.log(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (disabled) {
      return
    }
    dispatch(
      login({
        username,
        password,
      }),
    )
  }

  const navigateToRegistration = () => () => {
    navigate('/registration')
  }

  useEffect(() => {
    if (username.length > 0 && password.length > 0 && !progress) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [username, password, progress])

  return (
    <div className={bem()}>
      <Typography
        variant="button"
        display="block"
        align="center"
        className={bem('Title')}
      >
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          className={bem('TextField')}
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          autoComplete="off"
          InputProps={{
            onInput: handleUsernameChange,
          }}
        />

        <TextField
          className={bem('TextField')}
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          autoComplete="off"
          InputProps={{
            onInput: handlePasswordChange,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled}
          className={bem('LoginButton')}
        >
          Login
        </Button>
      </form>

      <div className={bem('Registration')}>
        <Typography
          variant="button"
          display="block"
          align="center"
          className={bem('RegistrationText')}
        >
          Dont have an account?{' '}
        </Typography>
        <Link
          component="button"
          onClick={navigateToRegistration()}
          variant="button"
          className={bem('RegistrationLink')}
        >
          registration
        </Link>
      </div>
    </div>
  )
}
