import React from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ClientLogout } from '../../../Redux/ClientAuth'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state)=>state.Client.Token);
  console.log(user);
  const logout=()=>{
      dispatch(ClientLogout());
      navigate('/login')
  }

  return (
    <>
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a 
        className="navbar-brand ms-4" 
        onClick={() => {
        navigate("/")}}><b>Home</b></a>
        <form class="form-inline">
          {user ? <button class="btn btn-outline-success my-2 my-sm-0 me-2" type="submit" onClick={()=>navigate('/user-profile')}>profile</button> : null}
          {user ? <button class="btn btn-outline-success my-2 my-sm-0 me-3" type="submit" onClick={()=>logout()}>logout</button> : 
          <button class="btn btn-outline-success my-2 my-sm-0 me-3" type="submit" onClick={()=>logout()}>login</button> }
        </form>
      </nav>
    </>
  )
}

export default Header
