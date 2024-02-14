import React from 'react'
import { cn } from '@bem-react/classname'
import { Button, TextField } from '@mui/material'

import { Card } from '../../models/Card'
import './CreateCard.scss'

const bem = cn('CreateCard')

type CreateCardProps = {
  createCard: (card: Card) => void
  closeDialog: () => void
}

export const CreateCard: React.FC<CreateCardProps> = ({ createCard, closeDialog }) => {
  const [word, setWord] = React.useState('')
  const [translation, setTranslation] = React.useState('')

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.target.value)
  }

  const handleCreateCard = () => {
    createCard({ word, translation })
    closeDialog()
  }
  return (
    <div className={bem()}>
      <TextField
        id="standard-basic"
        label="Word"
        variant="standard"
        className={bem('Input')}
        onChange={handleInputChange1}
        autoComplete="off"
      />

      <TextField
        id="standard-basic"
        label="Translation"
        variant="standard"
        className={bem('Input')}
        onChange={handleInputChange2}
        autoComplete="off"
      />

      <div className={bem('Buttons')}>
        <Button variant="text" onClick={closeDialog} className={bem('Button')}>
          cancel
        </Button>

        <Button variant="text" onClick={handleCreateCard} className={bem('Button')}>
          create
        </Button>
      </div>
    </div>
  )
}
