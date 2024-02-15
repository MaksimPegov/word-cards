import React from 'react'
import { cn } from '@bem-react/classname'
import { CloudOff, Dashboard } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

import './AppHeader.scss'
import { useDispatch, useSelector } from 'react-redux'
import { unselectCollection } from '../../state/collections/collections.reducer'
import { selectCurrentCollectionId } from '../../state/collections/collections.selector'

const bem = cn('AppHeader')

export const AppHeader: React.FC = () => {
  const [openTooltip, setOpenTooltip] = React.useState(false)
  const isCollectionSelected = Boolean(useSelector(selectCurrentCollectionId))

  const dispatch = useDispatch()

  const cloudMessage =
    'Cloud synchronization is not available yet, all your data is stored locally!'

  const togleTooltip = () => {
    setOpenTooltip((old) => !old)
  }

  const collectionsButtonHandler = () => {
    dispatch(unselectCollection())
  }

  return (
    <AppBar position="static" className={bem()}>
      <Toolbar>
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

        <Tooltip
          title={cloudMessage}
          PopperProps={{
            disablePortal: true,
          }}
          onClose={togleTooltip}
          open={openTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <IconButton className={bem('CloudSync')} onClick={togleTooltip}>
            <CloudOff fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
