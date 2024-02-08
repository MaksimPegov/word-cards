import React from 'react'
import { cn } from '@bem-react/classname'
import { CloudOff, Dashboard } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

import './AppHeader.scss'

const bem = cn('AppHeader')

export const AppHeader: React.FC = () => {
  const cloudMessage =
    'Cloud synchronization is not available yet, all your data is stored locally!'

  return (
    <AppBar position="static" className={bem()}>
      <Toolbar>
        <Dashboard sx={{ mr: 1 }} />

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
        >
          CARDS
        </Typography>

        <Button
          color="inherit"
          className={bem('Button', { Collections: true })}
          variant="outlined"
        >
          Collections
        </Button>

        <Tooltip disableFocusListener title={cloudMessage}>
          <IconButton className={bem('CloudSync')}>
            <CloudOff fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
