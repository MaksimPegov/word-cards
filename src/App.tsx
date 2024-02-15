import React from 'react'
import { cn } from '@bem-react/classname'
import { AppHeader } from './container/AppBar/AppHeader'
import { SingleCardView } from './container/SingleCardView/SingleCardView'
import { CollectionsList } from './container/Collections/CollectionsList'
import { Divider, Typography } from '@mui/material'

import { selectCurrentCollectionId } from './state/collections/collections.selector'
import { useSelector } from 'react-redux'

import './App.scss'

const bem = cn('App')

export const App: React.FC = () => {
  const isCollectionSelected = Boolean(useSelector(selectCurrentCollectionId))

  return (
    <div className={bem()}>
      <AppHeader />
      <div className={bem('Main')}>
        <div className={bem('Collections', { fullScreen: !isCollectionSelected })}>
          <CollectionsList />
        </div>
        <Divider orientation="vertical" className={bem('Divider')} />
        <div className={bem('Cards', { fullScreen: isCollectionSelected })}>
          {isCollectionSelected ? (
            <SingleCardView />
          ) : (
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              fontSize={13}
              margin={5}
              className={bem('SelectCollectionAlert')}
            >
              Select collection to start!
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
