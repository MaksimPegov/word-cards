import React, { ReactNode, useEffect } from 'react'
import { isUserAuthorizedSelector } from 'state/user/user.selector'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AuthGuard = ({ comp }: { comp: ReactNode }) => {
  const isLogedIn = useSelector(isUserAuthorizedSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogedIn) {
      navigate('/sign-in')
    }
  }, [comp, isLogedIn, navigate])

  return !isLogedIn ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  )
}
