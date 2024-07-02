import { configureStore } from '@reduxjs/toolkit'

import collectionsReducer from './collections/collections.reducer'
import cardsReducer from './cards/cards.reducer'
import userReducer from './user/user.reducer'

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    collections: collectionsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
