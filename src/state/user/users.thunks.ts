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
    try {
      const response = await fetch('http://localhost:9001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockCredentials),
      })

      if (response.ok) {
        return await response.json()
      }

      if (response.status === 401 || response.status === 404) {
        return rejectWithValue('Invalid credentials')
      }

      if (response.status >= 500) {
        return rejectWithValue('Server error')
      }

      if (response.status >= 400 && response.status < 500) {
        return rejectWithValue('Invalid request')
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred')
    }
  },
)

export { login }
