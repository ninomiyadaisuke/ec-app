import { signInAction } from "./actions"
import { push } from "connected-react-router"

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSignedIn
    
    if (!isSignedIn) {
      const url = "https://api.github.com/users/deatiger"

      const response = await fetch(url).then(res => res.json()).catch(() => null)
      
      const userName = response.login

      dispatch(signInAction({
        isSignedIn: true,
        uid: "00001",
        userName: userName
      }))
      dispatch(push("/"))
    }
  }
}