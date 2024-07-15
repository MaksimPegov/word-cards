import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import { logoutUser } from 'state/user/user.reducer'
import { AppDispatch } from 'state/store'
import { useNavigate } from 'react-router-dom'

export const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <div>
      <h1>UserProfile</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        sign out
      </Button>
    </div>
  )
}
