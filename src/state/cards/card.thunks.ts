import { createAsyncThunk } from '@reduxjs/toolkit'

import { Card } from '../../models/Card'

const fetchCards = createAsyncThunk('cards/fetchCards', async (collectionId: number) => {
  const storage = localStorage.getItem(collectionId.toString())

  if (storage) {
    return JSON.parse(storage)
  }
  return []
})

const addCard = createAsyncThunk(
  'cards/addCard',
  async (addCardRequest: { card: Card; collectionId: number }) => {
    const storage = localStorage.getItem(addCardRequest.collectionId.toString())

    if (storage) {
      const cards = JSON.parse(storage)
      cards.push(addCardRequest.card)
      localStorage.setItem(addCardRequest.collectionId.toString(), JSON.stringify(cards))
      return cards
    } else {
      localStorage.setItem(
        addCardRequest.collectionId.toString(),
        JSON.stringify([addCardRequest.card]),
      )
      return [addCardRequest.card]
    }
  },
)

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
