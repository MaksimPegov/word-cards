import React, { useEffect, useState } from 'react'

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

import {
  Add,
  Delete,
  NavigateBefore,
  NavigateNext,
  Shuffle,
  ThreeSixty,
} from '@mui/icons-material'
import {
  flipCards,
  nextCard,
  previousCard,
  shuffleCards,
} from '../../state/cards/cards.reducer'
import {
  selectCards,
  selectCurrentCardIndex,
  selectIsFlipped,
} from '../../state/cards/cards.selectors'
import { AppDispatch } from '../../state/store'
import { useDispatch, useSelector } from 'react-redux'
import { addCard, fetchCards, removeCard } from '../../state/cards/card.thunks'
import { CreateCard } from '../../components/CreateCard/CreateCard'
import { CardPice } from '../../components/CardPice/CardPice'
import { Card } from '../../models/Card'
import { cn } from '@bem-react/classname'

import './SingleCardView.scss'
import { selectCurrentCollectionId } from '../../state/collections/collections.selector'

const bem = cn('SingleCardView')

export const SingleCardView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cards = useSelector(selectCards)

  const currentCardIndex = useSelector(selectCurrentCardIndex)
  const currentCollectionIndex = useSelector(selectCurrentCollectionId)
  const [createDialog, setCreateDialog] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [shuffleDisabled, setShuffleDisabled] = useState(false)
  const isFlipped = useSelector(selectIsFlipped)

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
    dispatch(addCard({ card: card, collectionId: currentCollectionIndex as number }))
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

  const flipAllCardsHandler = () => {
    dispatch(flipCards())
  }

  useEffect(() => {
    dispatch(fetchCards(currentCollectionIndex as number))
  }, [dispatch, currentCollectionIndex])

  return (
    <div className={bem()}>
      <div className={bem('CardComponent')}>
        <IconButton
          aria-label="priveous"
          size="large"
          className={bem('NavButton')}
          onClick={previouseCardHandler}
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
          <CardPice card={cards[currentCardIndex]} isFlippedByDefault={isFlipped} />
        )}

        <IconButton
          aria-label="Next"
          size="large"
          className={bem('NavButton')}
          onClick={nextCardHandler}
        >
          <NavigateNext fontSize="inherit" />
        </IconButton>
      </div>

      <div className={bem('Buttons')}>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
          className={bem('Button')}
          onClick={togleCreateDialog}
        >
          Add new
        </Button>

        <Button
          variant="outlined"
          size="large"
          className={bem('Button')}
          startIcon={<ThreeSixty />}
          onClick={flipAllCardsHandler}
        >
          Flip all cards
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
          startIcon={<Delete />}
          size="large"
          color="warning"
          className={bem('Button')}
          onClick={togleDeleteDialog}
        >
          Delete current
        </Button>
      </div>

      <Dialog
        open={createDialog}
        onClose={togleCreateDialog}
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
