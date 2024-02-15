import { cn } from '@bem-react/classname'
import React from 'react'

import { Collection } from '../../models/Collection'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'

import './CollectionCard.scss'
import { DeleteOutline } from '@mui/icons-material'

const bem = cn('CollectionCard')

export type CollectionCardProps = {
  collection: Collection
  currentCollection: boolean
  clickHandler: (id: number) => void
  onDelete: (id: number) => void
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  currentCollection,
  clickHandler,
  onDelete,
}) => {
  const [deleteDialog, setDeleteDialog] = React.useState(false)

  const togleDeleteDialog = () => {
    setDeleteDialog((old) => !old)
  }
  return (
    <div
      className={bem({
        selected: currentCollection,
      })}
      onClick={() => clickHandler(collection.id)}
    >
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        fontSize={13}
        className={bem('CollectionName')}
      >
        {collection.name}
      </Typography>

      <IconButton className={bem('Delete')} onClick={togleDeleteDialog}>
        <DeleteOutline />
      </IconButton>

      <Dialog open={deleteDialog} onClose={togleDeleteDialog} style={{ margin: '30px' }}>
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this collection?'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All cards in this collection will be deleted
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={togleDeleteDialog}>Cancel</Button>
          <Button onClick={() => onDelete(collection.id)} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
