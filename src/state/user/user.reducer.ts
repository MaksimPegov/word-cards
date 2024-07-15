import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'

import { login, registration } from 'state/user/users.thunks'
import { User } from 'models/User'

type UserState = {
  user: User | null
  loginProcessing: boolean
  loginError: string | null

  registrationProcessing: boolean
  registrationError: string | null
  registrationSuccess: boolean
}

const initialState: UserState = {
  user: getUserFromStorage(),
  loginProcessing: false,
  loginError: null,

  registrationProcessing: false,
  registrationError: null,
  registrationSuccess: false,
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

    clearRegistrationSuccess(state) {
      state.registrationSuccess = false
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

    // registration reducers
    builder.addCase(registration.pending, (state) => {
      state.registrationProcessing = true
      state.registrationError = null
    })
    builder.addCase(registration.fulfilled, (state, action) => {
      state.registrationProcessing = false
      state.registrationSuccess = true

      enqueueSnackbar('You registered successfully :)', { variant: 'success' })
    })
    builder.addCase(registration.rejected, (state, action) => {
      state.registrationProcessing = false
      state.registrationError = action.payload as string

      enqueueSnackbar(state.registrationError as string, { variant: 'error' })
    })
  },
})

export const { logoutUser, clearRegistrationSuccess } = UserSlice.actions

export default UserSlice.reducer
