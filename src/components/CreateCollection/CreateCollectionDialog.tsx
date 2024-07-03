import React from 'react'
import { cn } from '@bem-react/classname'
import { Button, TextField } from '@mui/material'

import 'components/CreateCollection/CreateCollectionDialog.scss'

const bem = cn('CreateCollectionDialog')

export type CreateCollectionDialogProps = {
  createCollection: (collectionName: string) => void
  closeDialog: () => void
}

export const CreateCollectionDialog: React.FC<CreateCollectionDialogProps> = ({
  createCollection,
  closeDialog,
}) => {
  const [collectionName, setCollectionName] = React.useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value)
  }

  const createCollectionHandler = () => {
    createCollection(collectionName)
    closeDialog()
  }

  return (
    <div className={bem()}>
      <TextField
        id="standard-basic"
        label="Collection name"
        variant="standard"
        className={bem('Input')}
        onChange={handleInputChange}
        autoComplete="off"
      />

      <Button
        variant="text"
        onClick={createCollectionHandler}
        className={bem('Button')}
        disabled={collectionName.trim().length === 0}
      >
        Create
      </Button>
    </div>
  )
}
