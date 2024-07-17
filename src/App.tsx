import React from 'react'
import { cn } from '@bem-react/classname'
import { Button, Divider, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentCollectionId } from 'state/collections/collections.selector'
import { SingleCardView } from 'container/SingleCardView/SingleCardView'
import { CollectionsList } from 'container/Collections/CollectionsList'
import 'App.scss'
import { ArrowBackIos } from '@mui/icons-material'
import { AppDispatch } from 'state/store'
import { unselectCollection } from 'state/collections/collections.reducer'

const bem = cn('App')

export const App: React.FC = () => {
  const isCollectionSelected = Boolean(useSelector(selectCurrentCollectionId))

  const dispatch = useDispatch<AppDispatch>()

  const collectionsButtonHandler = () => {
    dispatch(unselectCollection())
  }

  return (
    <div className={bem()}>
      <div className={bem('Main')}>
        <div className={bem('Collections', { fullScreen: !isCollectionSelected })}>
          <CollectionsList />
        </div>
        <Divider orientation="vertical" className={bem('Divider')} />
        <div className={bem('Cards', { fullScreen: isCollectionSelected })}>
          {isCollectionSelected ? (
            <div>
              <Button
                className={bem('BackButton')}
                variant="text"
                startIcon={<ArrowBackIos />}
                onClick={collectionsButtonHandler}
              >
                back to collections
              </Button>
              <SingleCardView />
            </div>
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
