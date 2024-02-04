import { createSlice } from '@reduxjs/toolkit'

import { addCard, fetchCards, removeCard } from './card.actions'
import { Card, mokedCards } from '../../models/Card'

interface CardsState {
  cards: Card[]
  loading: boolean
  error: string | null
}

const initialState: CardsState = {
  cards: mokedCards,
  loading: false,
  error: null,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
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
      state.cards.push(action.payload)
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
      state.cards = state.cards.filter((card) => card.word !== action.payload.word)
    })
    builder.addCase(removeCard.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })
  },
})

// export const { addCard, removeCard } = cardsSlice.actions

export default cardsSlice.reducer
