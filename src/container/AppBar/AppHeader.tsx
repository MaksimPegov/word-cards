import React from 'react'
import { cn } from '@bem-react/classname'
import { AccountBox, Dashboard } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCurrentCollectionId } from 'state/collections/collections.selector'
import { unselectCollection } from 'state/collections/collections.reducer'
import { AppDispatch } from 'state/store'
import 'container/AppBar/AppHeader.scss'

const bem = cn('AppHeader')

export const AppHeader: React.FC = () => {
  const isCollectionSelected = Boolean(useSelector(selectCurrentCollectionId))

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const logoClickHandler = () => {
    navigate('/main')
  }

  const togleTooltip = () => {
    navigate('/profile')
  }

  const collectionsButtonHandler = () => {
    dispatch(unselectCollection())
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

        {isCollectionSelected ? (
          <Button
            color="inherit"
            className={bem('Button', { Collections: true })}
            variant="outlined"
            onClick={collectionsButtonHandler}
          >
            Collections
          </Button>
        ) : null}

        <Tooltip title="Your profile" arrow>
          <IconButton className={bem('CloudSync')} onClick={togleTooltip}>
            <AccountBox fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
