import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'models/User'
import { enqueueSnackbar } from 'notistack'

import { login } from 'state/user/users.thunks'

type UserState = {
  user: User | null
  loginProcessing: boolean
  loginError: string | null
}

const initialState: UserState = {
  user: getUserFromStorage(),
  loginProcessing: false,
  loginError: null,
}

function getUserFromStorage(): User | null {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

function setUserToStorage(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('user')
      state.user = null

      enqueueSnackbar('Logged out successfully :)', { variant: 'success' })
    },
  },
  extraReducers: (builder) => {
    // login reducers
    builder.addCase(login.pending, (state) => {
      state.loginProcessing = true
      state.loginError = null
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.loginProcessing = false

      setUserToStorage(action.payload)

      enqueueSnackbar('You logged in successfully :)', { variant: 'success' })
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginProcessing = false
      state.loginError = action.payload as string

      enqueueSnackbar(state.loginError as string, { variant: 'error' })
    })
  },
})

export const { logoutUser } = UserSlice.actions

export default UserSlice.reducer
