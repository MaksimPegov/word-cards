import { Button, Divider, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@bem-react/classname'

import { logoutUser } from 'state/user/user.reducer'
import { AppDispatch } from 'state/store'
import { useNavigate } from 'react-router-dom'

import { selectUser } from 'state/user/user.selector'
import { User } from 'models/User'
import './UserProfile.scss'

const bem = cn('UserProfile')

export const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const user: User = useSelector(selectUser) as User

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <div className={bem()}>
      <Typography
        variant="button"
        display="block"
        align="center"
        className={bem('Title')}
      >
        Your profile
      </Typography>

      <div className={bem('UsernameField')}>
        <Typography variant="subtitle1" gutterBottom>
          User name:
        </Typography>

        <Typography variant="subtitle1" gutterBottom className={bem('Username')}>
          {user.username}
        </Typography>
      </div>
      <Divider />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        className={bem('SignOutButton')}
      >
        sign out
      </Button>
    </div>
  )
}
