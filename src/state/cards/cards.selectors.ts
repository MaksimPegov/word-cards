import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

const selectCardsSlice = (state: RootState) => state.cards

export const selectCards = createSelector(selectCardsSlice, (cards) => cards.cards)

export const selectCurrentCardIndex = createSelector(
  selectCardsSlice,
  (cards) => cards.currentCardIndex,
)

export const selectIsFlipped = createSelector(
  selectCardsSlice,
  (cards) => cards.isFlipped,
)
