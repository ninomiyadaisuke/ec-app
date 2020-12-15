import { createStore } from "redux"
import { createSelector } from "reselect"

const usersSelector = (state) => state.users

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)


export const getUsersId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsersName = createSelector(
  [usersSelector],
  state => state.userName
)