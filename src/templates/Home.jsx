import React from 'react'
import { getUsersId, getUsersName } from "../reducks/users/selectors"
import { useSelector, useDispatch } from "react-redux"
import { signOut } from "../reducks/users/operations"

const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const uid = getUsersId(selector)
  const userName = getUsersName(selector)
  
  return (
    <div>
      <h2>ホーム</h2>
      <p>ユーザー名:{uid}</p>
      <p>ユーザーID:{userName}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
    
  )
}

export default Home
