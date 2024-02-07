import { cn } from '@bem-react/classname'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, IconButton, Typography } from '@mui/material'
import { Add, Delete, NavigateBefore, NavigateNext } from '@mui/icons-material'

import { selectCards, selectCurrentCardIndex } from './state/cards/cards.selectors'
import { addCard, fetchCards, removeCard } from './state/cards/card.actions'
import { nextCard, previousCard } from './state/cards/cards.reducer'
import { AppDispatch } from './state/store'
import { CreateCard } from './components/CreateCard/CreateCard'
import { CardPice } from './components/CardPice/CardPice'
import { Card } from './models/Card'

import './App.scss'

const bem = cn('App')

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cards = useSelector(selectCards)

  const currentCardIndex = useSelector(selectCurrentCardIndex)
  const [createDialog, setcreateDialog] = useState(false)

  const nextCardHandler = () => {
    dispatch(nextCard())
  }

  const previouseCardHandler = () => {
    dispatch(previousCard())
  }

  const togleDialog = () => {
    setcreateDialog((old) => !old)
  }

  const createCard = (card: Card) => {
    dispatch(addCard(card))
  }

  const deleteCurrentCard = () => {
    dispatch(removeCard(cards[currentCardIndex]))
  }

  useEffect(() => {
    dispatch(fetchCards())
  }, [])

  return (
    <div className={bem()}>
      <div className={bem('CardComponent')}>
        <IconButton
          aria-label="priveous"
          size="large"
          className={bem('NavButton')}
          onClick={nextCardHandler}
        >
          <NavigateBefore fontSize="inherit" />
        </IconButton>

        {cards.length === 0 ? (
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            fontSize={13}
            margin={5}
          >
            {'No cards yet :('}
          </Typography>
        ) : (
          <CardPice card={cards[currentCardIndex]} />
        )}

        <IconButton
          aria-label="Next"
          size="large"
          className={bem('NavButton')}
          onClick={previouseCardHandler}
        >
          <NavigateNext fontSize="inherit" />
        </IconButton>
      </div>

      <div className={bem('Buttons')}>
        <Button
          variant="outlined"
          startIcon={<Delete />}
          size="large"
          className={bem('Button')}
          onClick={deleteCurrentCard}
        >
          Delete current
        </Button>

        <Button
          variant="contained"
          endIcon={<Add />}
          size="large"
          className={bem('Button')}
          onClick={togleDialog}
        >
          Add new
        </Button>
      </div>

      <Dialog open={createDialog} onClose={() => setcreateDialog(false)}>
        <CreateCard createCard={createCard} closeDialog={togleDialog} />
      </Dialog>
    </div>
  )
}
