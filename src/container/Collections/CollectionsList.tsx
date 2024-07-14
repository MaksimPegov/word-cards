import { Button, Dialog, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { cn } from '@bem-react/classname'

import {
  selectCollections,
  selectCurrentCollectionId,
} from 'state/collections/collections.selector'
import {
  addCollection,
  fetchCollections,
  removeCollection,
} from 'state/collections/collections.thunks'
import { Collection } from 'models/Collection'
import { AppDispatch } from 'state/store'
import { setCurrentCollection } from 'state/collections/collections.reducer'
import { CreateCollectionDialog } from 'components/CreateCollection/CreateCollectionDialog'
import { CollectionCard } from 'components/Collection/CollectionCard'
import 'container/Collections/CollectionsList.scss'

const bem = cn('Collections')

export const CollectionsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const collections = useSelector(selectCollections)
  const currentCollectionId = useSelector(selectCurrentCollectionId)

  const [createDialog, setCreateDialog] = React.useState(false)

  const togleCreateDialog = () => {
    setCreateDialog((old) => !old)
  }

  const selectCollectionHandler = (id: number) => {
    dispatch(setCurrentCollection(id))
  }

  const createCollectionHandler = (name: string) => {
    dispatch(addCollection({ id: Date.now(), name: name }))
  }

  const deleteCollectionHandler = (id: number) => {
    dispatch(removeCollection(id))
  }

  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])

  return (
    <div className={bem()}>
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        fontSize={15}
        margin={5}
        className={bem('Header')}
      >
        Your collections:
      </Typography>

      {collections.length === 0 ? (
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          fontSize={10}
          margin={5}
          className={bem('SelectCollectionAlert')}
        >
          {`No collections yet :(`}
        </Typography>
      ) : (
        collections.map((collection: Collection) => {
          return (
            <CollectionCard
              collection={collection}
              key={collection.id}
              currentCollection={collection.id === currentCollectionId}
              clickHandler={selectCollectionHandler}
              onDelete={deleteCollectionHandler}
            />
          )
        })
      )}

      <div className={bem('CreateCollection')}>
        {/* <TextField value={newCollectionName} onChange={inputChange} autoComplete="off" /> */}
        <Button
          className={bem('CreteButton')}
          onClick={togleCreateDialog}
          variant="contained"
        >
          Create collection
        </Button>
      </div>

      <Dialog
        open={createDialog}
        onClose={togleCreateDialog}
        className={bem('CreateDialog')}
      >
        <CreateCollectionDialog
          createCollection={createCollectionHandler}
          closeDialog={togleCreateDialog}
        />
      </Dialog>
    </div>
  )
}
