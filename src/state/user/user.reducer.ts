import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { login } from 'state/user/users.thunks'

type UserState = {
  username: string | null
  token: string | null
  loginProcessing: boolean
  loginError: string | null
}

const initialState: UserState = {
  username: null,
  token: null,
  loginProcessing: false,
  loginError: null,
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login reducers
    builder.addCase(login.pending, (state) => {
      state.loginProcessing = true
      state.loginError = null
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.loginProcessing = false
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginProcessing = false
      state.loginError = action.error.message as string
    })
  },
})

export default UserSlice.reducer
