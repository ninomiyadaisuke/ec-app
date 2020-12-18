import { signInAction, signOutAction } from "./actions"
import { push } from "connected-react-router"
import { auth, FirebaseTimeStamp, db } from "../../firebase/index"

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const cartRef = db.collection("users").doc(uid).collection("cart").doc()
    addedProduct["cartId"] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push("/"))
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
          const uid = user.uid
          
          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                userName: data.userName
              }))
            }) 
        console.log(user);
      } else {
        dispatch(push("/signin"))
      }
    })
  }
}


export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目がみ入力です")
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert("入力されたアドレスにパスワードリセット用のメールを送りました。")
          dispatch(push("/signin"))
        }).catch(() => {
          alert("パスワードリセットに失敗しました。")
        })
    }
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です")
      return false
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user
        
        if (user) {
          const uid = user.uid

          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                userName: data.userName
              }))

              dispatch(push("/"))
            })
        }
        })
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

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push("/signin"))
      })
  }
}
