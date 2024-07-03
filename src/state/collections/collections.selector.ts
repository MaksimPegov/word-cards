import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'state/store'

const selectCollectionsSlice = (state: RootState) => state.collections

export const selectCollections = createSelector(
  selectCollectionsSlice,
  (collections) => collections.collections,
)

export const selectCurrentCollectionId = createSelector(
  selectCollectionsSlice,
  (collections) => collections.selectedCollectionId,
)

export const selectCurrentCollection = createSelector(
  selectCollections,
  selectCurrentCollectionId,
  (collections, selectedCollectionId) => {
    return collections.find((collection) => collection.id === selectedCollectionId)
  },
)
