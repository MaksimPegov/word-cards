import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

export const selectCardsSlice = (state: RootState) => state.cards

export const selectCards = createSelector(selectCardsSlice, (cards) => cards.cards)
