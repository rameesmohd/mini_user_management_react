import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import userAxios from '../../../Axios/UserAxios'
import { useDispatch } from 'react-redux'
import { ClientLogin } from '../../../Redux/ClientAuth'
import './Login.css'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [errMsg,setErrMssg] = useState('')  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginForm=(e)=>{
        e.preventDefault()
        userAxios.post("/login",{email,password}).then((res)=>{
            const result = res.data.response
            if(result.status){
                const token = result.token
                dispatch(ClientLogin({token : token , name : result.name})) //payload - arguments
                navigate('/')
            }else{
                setErrMssg(result.message)
            }
        })
    }

  return (
    <section className="sign-in">
    <div className="container_login" style={{ marginTop: "100px" }}>
        <div className="signIn-content">
            <div className="signIn-image">
                <figure>
                    <img src="https://rurutek.com/jio/assets/img/login-animate.gif" alt="sign up image" />
                </figure>
                <a onClick={()=>navigate('/register')} className="signUp-image-link">Create an account</a>
            </div>
            <div className="signIn-form">
                <h2 className="form-title">Log In</h2>
                <form method="POST" className="register-form" id="login-form" onSubmit={loginForm}>
                    <div className="form-group">
                        <label htmlFor="your_name">
                            <i className="zmdi zmdi-account material-icons-name"></i>
                        </label>
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="your_name" id="your_name" placeholder="Your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="your_pass">
                            <i className="zmdi zmdi-lock"></i>
                        </label>
                        <input type="password" name="your_pass" id="your_pass" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signIn" id="signIn" className="form-submit" value="Log in" />
                    </div>
                    <div>
                        <p style={{ color: "red" }}></p>
                    </div>
                    {errMsg.length>0 && (<div><p style={{color:"red"}}>{errMsg}</p></div>)}
                </form>
            </div>
        </div>
    </div>
    </section>

  )
}

export default Login


