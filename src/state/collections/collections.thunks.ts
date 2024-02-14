import { createAsyncThunk } from '@reduxjs/toolkit'

import { Collection } from '../../models/Collection'

const fetchCollections = createAsyncThunk('collections/fetchCollections', async () => {
  const storage = localStorage.getItem('collections')

  if (storage) {
    return JSON.parse(storage)
  }
  return []
})

const addCollection = createAsyncThunk(
  'collections/addCollection',
  async (collection: Collection, thunkAPI) => {
    const storage = localStorage.getItem('collections')

    if (storage) {
      const collections = JSON.parse(storage)
      collections.push(collection)
      localStorage.setItem('collections', JSON.stringify(collections))
    } else {
      localStorage.setItem('collections', JSON.stringify([collection]))
    }

    thunkAPI.dispatch(fetchCollections())
  },
)

const removeCollection = createAsyncThunk(
  'collections/removeCollection',
  async (collectionId: number, thunkAPI) => {
    const storage = localStorage.getItem('collections')

    if (storage) {
      const collections = JSON.parse(storage)
      const remainingCollections = collections.filter(
        (collection: Collection) => collection.id !== collectionId,
      )
      localStorage.setItem('collections', JSON.stringify(remainingCollections))
    }

    thunkAPI.dispatch(fetchCollections())
  },
)

const renameCollection = createAsyncThunk(
  'collections/renameCollection',
  async ({ id, name }: { id: number; name: string }, thunkAPI) => {
    const storage = localStorage.getItem('collections')

    if (storage) {
      const collections = JSON.parse(storage)
      const collection = collections.find(
        (collection: Collection) => collection.id === id,
      )
      collection.name = name
      localStorage.setItem('collections', JSON.stringify(collections))
    }

    thunkAPI.dispatch(fetchCollections())
  },
)

export { fetchCollections, addCollection, removeCollection, renameCollection }
