import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { addCard, fetchCards, removeCard } from './card.actions'
import { Card, mokedCards } from '../../models/Card'

interface CardsState {
  cards: Card[]
  currentCardIndex: number
  loading: boolean
  error: string | null
}

const initialState: CardsState = {
  cards: [],
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
      const oldCards = state.cards
      do {
        for (let i = state.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[state.cards[i], state.cards[j]] = [state.cards[j], state.cards[i]]
        }
      } while (oldCards[state.currentCardIndex] !== state.cards[state.currentCardIndex])
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

export const { nextCard, previousCard, setCurrentCardIndex, shuffleCards, setTestCards } =
  cardsSlice.actions

export default cardsSlice.reducer
