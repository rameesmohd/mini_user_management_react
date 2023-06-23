import React,{useState,useRef} from 'react'
import userAxios from '../../../Axios/UserAxios'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg ,setErrMsg] = useState('')
    const navigate = useNavigate()

    const signUpFrom =(event) =>{
        event.preventDefault();
        userAxios.post("/register",{ name,email,phone,password }).then((res)=>{
            if(res.data.status){
                navigate("/login")
            }else{
                setErrMsg("Something went wrong!!")
            }
        })
    }

  return (
    <section className="signUp">
    <div className="container_login" style={{ marginTop: "100px" }}>
        <div className="signUp-content">
            <div className="signUp-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" onSubmit={signUpFrom} id="register-form" >
                    <div className="form-group">
                        <label htmlFor="name">
                            <i className="zmdi zmdi-account material-icons-name"></i>
                        </label>
                        <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} id="name"  placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="zmdi zmdi-email"></i>
                        </label>
                        <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">
                            <i className="fa-sharp fa-solid fa-address-book"></i>
                        </label>
                        <input type="text" name="phone" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Your Dial number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="re-pass">
                            <i className="zmdi zmdi-lock-outline"></i>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Enter your Password"
                        />
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signUp" id="signUp" className="form-submit" value="Register" />
                    </div>
                </form>
                {errMsg ? <h6 style={{color:"red"}}>{errMsg}</h6> : ''}
                <div style={{ color: "red" }}></div>
            </div>
            <div className="signUp-image">
                <figure>
                    <img src="/images/dag_hero_730x370_light.png" alt="sing up image" />
                </figure>
                <a onClick={()=>navigate('/login')} className="signUp-image-link">
                    I am already member
                </a>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Register
