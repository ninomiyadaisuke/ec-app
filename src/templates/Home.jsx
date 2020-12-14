import React from 'react'
import { getUsersId, getUsersName } from "../reducks/users/selectors"
import { useSelector } from "react-redux"


const Home = () => {
  const selector = useSelector(state => state)
  const uid = getUsersId(selector)
  const userName = getUsersName(selector)
  
  return (
    <div>
      <h2>ホーム</h2>
      <p>ユーザー名:{uid}</p>
      <p>ユーザーID:{userName}</p>
    </div>
    
  )
}

export default Home
