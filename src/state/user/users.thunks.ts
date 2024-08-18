import { createAsyncThunk } from '@reduxjs/toolkit'

export type UserCredentials = {
  username: string
  password: string
}

const login = createAsyncThunk(
  'user/login',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://word-cards-api-gateway.up.railway.app/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        },
      )

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
      return rejectWithValue('Sign is not avaliable now. Please, try again later :(')
    }
  },
)

const registration = createAsyncThunk(
  'user/registration',
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://word-cards-api-gateway.up.railway.app/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        },
      )

      // First, check the response status
      if (!response.ok) {
        const error = await response.json()
        console.error(error.message)
        return rejectWithValue(error.message)
      }
    } catch (error) {
      return rejectWithValue('Sign up is not avaliable now. Please, try again later :(')
    }
  },
)

export { login, registration }
