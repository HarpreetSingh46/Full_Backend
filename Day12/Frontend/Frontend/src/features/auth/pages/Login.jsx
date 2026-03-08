import React, { useState } from 'react'
import "../Styles/form.scss"
import { Link } from 'react-router-dom'
import axios from "axios"
import   {useAuth} from "../hooks/useAuth"
const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
const {handlelogin} = useAuth()
  function handleSubmit(e){
      e.preventDefault()
      handlelogin(username, password)
      .then(res=>{
        console.log(res);
        
      })
  
  }
  return (
    <div>
   <main>
    <div className="form-container">
        <h1>login</h1>
        <form onSubmit={handleSubmit} >
            <input
              onInput={(e)=>{setusername(e.target.value)}}
            type="text" name="username" placeholder='enter usename'/>
            <input
             onInput={(e)=>{setpassword(e.target.value)}}
            type="password" name="password" placeholder='Enter password'/>
            <button type='submit'>Login</button>
        </form>
        <p>Dont have an accoutn <Link className='toggleAuthForm' to="/register">Register</Link></p>
    </div>
   </main>
    </div>
  )
}

export default Login
