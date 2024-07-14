import { createAsyncThunk } from '@reduxjs/toolkit'

export type UserCredentials = {
  username: string
  password: string
}

const login = createAsyncThunk(
  'user/login',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:9001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      // First, check the response status
      if (!response.ok) {
        const error = await response.json()
        console.error(error.message)
        return rejectWithValue(error.message)
      }

      // Then, parse the JSON body
      const data = await response.json().then((json) => json.token)

      // Assuming the happy path returns the data
      return { username: credentials.username, token: data }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred')
    }
  },
)

const registration = createAsyncThunk(
  'user/registration',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:9001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      // First, check the response status
      if (!response.ok) {
        const error = await response.json()
        console.error(error.message)
        return rejectWithValue(error.message)
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred')
    }
  },
)

export { login, registration }
