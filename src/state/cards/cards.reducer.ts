import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { addCard, fetchCards, removeCard } from './card.actions'
import { Card } from '../../models/Card'

export const mokedCards: Card[] = [
  { word: 'Hello', translation: 'Hola' },
  { word: 'Goodbye', translation: 'Adiós' },
  { word: 'Please', translation: 'Por favor' },
  { word: 'Thank you', translation: 'Gracias' },
  { word: 'Yes', translation: 'Sí' },
  { word: 'No', translation: 'No' },
  { word: 'Good morning', translation: 'Buenos días' },
  { word: 'Good night', translation: 'Buenas noches' },
  { word: 'I love you', translation: 'Te quiero' },
  { word: 'Congratulations', translation: 'Felicidades' },
]

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
