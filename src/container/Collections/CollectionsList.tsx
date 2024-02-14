import { Button, Divider, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

import { setCurrentCollection } from '../../state/collections/collections.reducer'
import { selectCollections } from '../../state/collections/collections.selector'
import { AppDispatch } from '../../state/store'
import { Collection } from '../../models/Collection'
import {
  addCollection,
  fetchCollections,
} from '../../state/collections/collections.thunks'

import './CollectionsList.scss'

const bem = cn('Collections')

export const CollectionsList: React.FC = () => {
  const collections = useSelector(selectCollections)

  const [newCollectionName, setNewCollectionName] = React.useState('')
  const isButtonDisabled = newCollectionName === ''

  const dispatch = useDispatch<AppDispatch>()

  const selectCollectionHandler = (id: number) => {
    dispatch(setCurrentCollection(id))
  }

  const addCollectionHandler = () => {
    dispatch(addCollection({ id: Date.now(), name: newCollectionName }))
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCollectionName(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])

  return (
    <div className={bem()}>
      {collections.map((collection: Collection) => {
        return (
          <Button
            key={collection.id}
            className={bem('Collection')}
            onClick={() => selectCollectionHandler(collection.id)}
            variant="outlined"
          >
            {collection.name}
          </Button>
        )
      })}
      <Divider orientation="horizontal" />
      <div className={bem('CreateCollection')}>
        <TextField onChange={inputChange} autoComplete="off" />
        <Button
          className={bem('AddCollection')}
          onClick={addCollectionHandler}
          disabled={isButtonDisabled}
        >
          Add Collection
        </Button>
      </div>
    </div>
  )
}
