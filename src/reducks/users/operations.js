import { signInAction } from "./actions"
import { push } from "connected-react-router"
import { auth, FirebaseTimeStamp, db } from "../../firebase/index"

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

export const signUp = (userName, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (userName === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須項目が未入力です")
      return false
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致してません。もう一度お試しください")
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimeStamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            update_at: timestamp,
            userName: userName
          }
          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push("/"))
            })
        }
      
      })
  }
}
