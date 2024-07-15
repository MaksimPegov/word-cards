import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { cn } from '@bem-react/classname'

import './AuthButtons.scss'

const bem = cn('AuthButtons')

export const AuthButtons = () => {
  const navigate = useNavigate()

  return (
    <div className={bem()}>
      <Button
        className={bem('Button', { login: true })}
        variant="outlined"
        color="inherit"
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
      <Button
        className={bem('Button', { registration: true })}
        variant="contained"
        color="inherit"
        onClick={() => navigate('/registration')}
      >
        Registration
      </Button>
    </div>
  )
}
