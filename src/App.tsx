import React from 'react'
import { cn } from '@bem-react/classname'
import { SingleCardView } from './container/SingleCardView/SingleCardView'
import { AppHeader } from './container/AppBar/AppHeader'
import './App.scss'

const bem = cn('App')

export const App: React.FC = () => {
  return (
    <div className={bem()}>
      <AppHeader />
      <SingleCardView />
    </div>
  )
}
