import React from 'react'
import { cn } from '@bem-react/classname'
import { AccountBox, Dashboard } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import 'container/AppBar/AppHeader.scss'
import { isUserAuthorizedSelector } from 'state/user/user.selector'
import { AuthButtons } from 'components/AuthButtons/AuthButtons'

const bem = cn('AppHeader')

export const AppHeader: React.FC = () => {
  const isLoggedIn: boolean = useSelector(isUserAuthorizedSelector)

  const navigate = useNavigate()

  const logoClickHandler = () => {
    navigate('/main')
  }

  const togleTooltip = () => {
    navigate('/profile')
  }

  return (
    <AppBar position="static" className={bem()}>
      <Toolbar>
        <div className={bem('Logo')} onClick={logoClickHandler}>
          <Dashboard sx={{ mr: 1 }} className={bem('Logo')} />

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 4,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className={bem('Title')}
          >
            CARDS
          </Typography>
        </div>

        {isLoggedIn ? (
          <Tooltip title="Your profile" arrow>
            <IconButton className={bem('CloudSync')} onClick={togleTooltip}>
              <AccountBox fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          <AuthButtons />
        )}
      </Toolbar>
    </AppBar>
  )
}
