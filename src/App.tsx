import React from 'react'
import { cn } from '@bem-react/classname'
import { SingleCardView } from './container/SingleCardView/SingleCardView'
import { AppHeader } from './container/AppBar/AppHeader'
import { Divider } from '@mui/material'
import { CollectionsList } from './container/Collections/CollectionsList'

import './App.scss'

const bem = cn('App')

export const App: React.FC = () => {
  return (
    <div className={bem()}>
      <AppHeader />
      <div className={bem('Main')}>
        <div className={bem('CollectionsDiv')}>
          <CollectionsList />
        </div>
        <Divider orientation="vertical" />
        <div className={bem('CardsDiv')}>
          <SingleCardView />
        </div>
      </div>
    </div>
  )
}
