import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { addCollection, fetchCollections, removeCollection } from './collections.thunks'
import { Collection } from '../../models/Collection'

type CollectionsState = {
  collections: Collection[]
  selectedCollectionId: number | null
  loading: boolean
  error: string | null
}

const initialState: CollectionsState = {
  collections: [],
  selectedCollectionId: null,
  loading: false,
  error: null,
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCurrentCollection(state, action: PayloadAction<number>) {
      state.selectedCollectionId = action.payload
    },

    unselectCollection(state) {
      state.selectedCollectionId = null
    },
  },
  extraReducers: (builder) => {
    // fetchCollections reducers
    builder.addCase(fetchCollections.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchCollections.fulfilled,
      (state, action: PayloadAction<Collection[]>) => {
        state.loading = false
        state.collections = action.payload
      },
    )
    builder.addCase(fetchCollections.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })

    // addCollection reducers
    builder.addCase(addCollection.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addCollection.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(addCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })

    // removeCollection reducers
    builder.addCase(removeCollection.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(removeCollection.fulfilled, (state) => {
      state.loading = false
      if (!state.collections[state.selectedCollectionId as number]) {
        state.selectedCollectionId = null
      }
    })
    builder.addCase(removeCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'An error occurred.'
    })
  },
})

export const { setCurrentCollection, unselectCollection } = collectionsSlice.actions

export default collectionsSlice.reducer
