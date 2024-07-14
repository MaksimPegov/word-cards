import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isUserAuthorizedSelector } from 'state/user/user.selector'

export const UnAuthGuard = ({ comp }: { comp: ReactNode }) => {
  const isLogedIn = useSelector(isUserAuthorizedSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogedIn) {
      navigate('/profile')
    }
  }, [comp, isLogedIn, navigate])

  return isLogedIn ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>{comp}</React.Fragment>
  )
}
