import { createAsyncThunk } from '@reduxjs/toolkit'

import { Card, mokedCards } from '../../models/Card'

const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mokedCards
})

const addCard = createAsyncThunk('cards/addCard', async (card: Card) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return card
})

const removeCard = createAsyncThunk('cards/removeCard', async (card: Card) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return card
})

export { fetchCards, addCard, removeCard }
