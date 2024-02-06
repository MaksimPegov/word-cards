import { createAsyncThunk } from '@reduxjs/toolkit'

import { Card, mokedCards } from '../../models/Card'

const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const storage = localStorage.getItem('cards')
  if (storage) {
    return JSON.parse(storage)
  }
  return []
})

const addCard = createAsyncThunk('cards/addCard', async (card: Card) => {
  const storage = localStorage.getItem('cards')
  if (storage) {
    const cards = JSON.parse(storage)
    cards.push(card)
    localStorage.setItem('cards', JSON.stringify(cards))
    return cards
  } else {
    localStorage.setItem('cards', JSON.stringify([card]))
    return [card]
  }
})

const removeCard = createAsyncThunk('cards/removeCard', async (card: Card) => {
  const storage = localStorage.getItem('cards')
  if (storage) {
    const cards = JSON.parse(storage)
    const newCards = cards.filter(
      (c: Card) => c.word !== card.word && c.translation !== card.translation,
    )
    localStorage.setItem('cards', JSON.stringify(newCards))
    return newCards
  } else {
    return []
  }
})

export { fetchCards, addCard, removeCard }
