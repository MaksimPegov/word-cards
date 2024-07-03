import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { addCard, fetchCards, removeCard } from 'state/cards/card.thunks'
import { Card, mokedCards } from 'models/Card'

type CardsState = {
  cards: Card[]
  isFlipped: boolean
  currentCardIndex: number
  loading: boolean
  error: string | null
}

const initialState: CardsState = {
  cards: [],
  isFlipped: false,
  currentCardIndex: 0,
  loading: false,
  error: null,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCurrentCardIndex: (state, action: PayloadAction<number>) => {
      state.currentCardIndex = action.payload
    },

    nextCard: (state) => {
      state.currentCardIndex = (state.currentCardIndex + 1) % state.cards.length
    },

    previousCard: (state) => {
      state.currentCardIndex =
        (state.currentCardIndex - 1 + state.cards.length) % state.cards.length
    },

    shuffleCards: (state) => {
      // Remove the current card from the array
      const remainingCards = state.cards.filter(
        (card) => card !== state.cards[state.currentCardIndex],
      )

      // Shuffle the remaining cards
      for (let i = remainingCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[remainingCards[i], remainingCards[j]] = [remainingCards[j], remainingCards[i]]
      }

      // Add the current card back in at a random position
      const newPosition = Math.floor(Math.random() * (remainingCards.length + 1))
      remainingCards.splice(newPosition, 0, state.cards[state.currentCardIndex])

      state.cards = remainingCards
    },

    flipCards: (state) => {
      state.isFlipped = !state.isFlipped
    },

    setTestCards: (state) => {
      state.cards = mokedCards
      localStorage.setItem('cards', JSON.stringify(mokedCards))
    },
  },
  extraReducers: (builder) => {
    // fetchCards reducers
    builder.addCase(fetchCards.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.loading = false
      state.cards = action.payload
    })
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })

    // addCard reducers
    builder.addCase(addCard.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.loading = false
      state.cards = action.payload
      state.currentCardIndex = state.cards.length - 1
    })
    builder.addCase(addCard.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })

    // removeCard reducers
    builder.addCase(removeCard.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(removeCard.fulfilled, (state, action) => {
      state.loading = false
      state.currentCardIndex = 0
      state.cards = action.payload
    })
    builder.addCase(removeCard.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })
  },
})

export const {
  nextCard,
  previousCard,
  setCurrentCardIndex,
  shuffleCards,
  setTestCards,
  flipCards,
} = cardsSlice.actions

export default cardsSlice.reducer
