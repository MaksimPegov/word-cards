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
import { cn } from '@bem-react/classname'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Add, Delete, NavigateBefore, NavigateNext, Shuffle } from '@mui/icons-material'

import {
  nextCard,
  previousCard,
  setTestCards,
  shuffleCards,
} from './state/cards/cards.reducer'
import { selectCards, selectCurrentCardIndex } from './state/cards/cards.selectors'
import { addCard, fetchCards, removeCard } from './state/cards/card.actions'
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
  const [createDialog, setCreateDialog] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [shuffleDisabled, setShuffleDisabled] = useState(false)

  const nextCardHandler = () => {
    dispatch(nextCard())
  }

  const previouseCardHandler = () => {
    dispatch(previousCard())
  }

  const togleCreateDialog = () => {
    setCreateDialog((old) => !old)
  }

  const togleDeleteDialog = () => {
    setDeleteConfirm((old) => !old)
  }

  const createCard = (card: Card) => {
    dispatch(addCard(card))
  }

  const deleteCurrentCard = () => {
    dispatch(removeCard(cards[currentCardIndex]))
    setDeleteConfirm(false)
  }

  const shuffleCardsHandler = () => {
    setShuffleDisabled(true)
    dispatch(shuffleCards())
    setTimeout(() => {
      setShuffleDisabled(false)
    }, 1000)
  }

  const setTestCardsHandler = () => {
    dispatch(setTestCards())
  }

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

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
          startIcon={<Delete />}
          size="large"
          color="warning"
          className={bem('Button')}
          onClick={togleDeleteDialog}
        >
          Delete current
        </Button>

        <Button
          startIcon={<Shuffle />}
          size="large"
          variant="outlined"
          className={bem('Button')}
          onClick={shuffleCardsHandler}
          disabled={shuffleDisabled}
        >
          shuffle
        </Button>

        <Button
          variant="contained"
          endIcon={<Add />}
          size="large"
          className={bem('Button')}
          onClick={togleCreateDialog}
        >
          Add new
        </Button>
      </div>

      <Button className={bem('TestButton')} onClick={setTestCardsHandler}>
        {'Set test cards'}
      </Button>

      <Dialog
        open={createDialog}
        onClose={togleDeleteDialog}
        className={bem('CreateDialog')}
      >
        <CreateCard createCard={createCard} closeDialog={togleCreateDialog} />
      </Dialog>

      <Dialog
        open={deleteConfirm}
        onClose={togleDeleteDialog}
        className={bem('DeleteDialog')}
        style={{ margin: '20px' }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this card?'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={togleDeleteDialog}>Cancel</Button>
          <Button onClick={deleteCurrentCard} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
