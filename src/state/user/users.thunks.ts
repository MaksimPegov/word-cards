import { createAsyncThunk } from '@reduxjs/toolkit'

export type LoginDTO = {
  username: string
  password: string
}

export const mockCredentials: LoginDTO = {
  username: 'admin',
  password: 'password',
}

const login = createAsyncThunk(
  'user/login',
  async (credentials: LoginDTO, { rejectWithValue }) => {
    console.log('credentials', credentials)
    try {
      const response = await fetch('http://localhost:9001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockCredentials),
      })

      // First, check the response status
      if (!response.ok) {
        const error = await response.json().then((json) => json.message)
        return rejectWithValue(error)
      }

      // Then, parse the JSON body
      const data = await response.json().then((json) => json.token)

      // Assuming the happy path returns the data
      return data
    } catch (error) {
      return rejectWithValue('An unexpected error occurred')
    }
  },
)

export { login }
