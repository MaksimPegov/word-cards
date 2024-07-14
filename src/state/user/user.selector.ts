import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'state/store'

const selectUserSlice = (state: RootState) => state.user

export const isUserAuthorizedSelector = createSelector(selectUserSlice, (userState) =>
  userState.user ? true : false,
)

export const userErrorSelector = createSelector(
  selectUserSlice,
  (userState) => userState.loginError,
)

export const inProgressSelector = createSelector(
  selectUserSlice,
  (userState) => userState.loginProcessing,
)
