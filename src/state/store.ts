import { configureStore } from '@reduxjs/toolkit'

import collectionsReducer from 'state/collections/collections.reducer'
import cardsReducer from 'state/cards/cards.reducer'
import userReducer from 'state/user/user.reducer'

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    collections: collectionsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
