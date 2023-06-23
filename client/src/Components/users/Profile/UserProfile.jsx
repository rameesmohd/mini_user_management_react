import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import userAxios from '../../../Axios/UserAxios.js'
import {AddUser} from '../../../Redux/ClientAuth.js'

const UserProfile =()=> {
  const dispatch=useDispatch()
  const Navigate = useNavigate()
  const [UserData, setUserData] = useState({});
  const token = useSelector((state)=>state.Client.Token)

  if(!token){
    Navigate('/')
  }

  useEffect(()=>{
    userAxios.get('/user-profile',{
      headers : {
          Authorization : `Bearer ${token}`
      }
    }).then((res)=>{
          setUserData(res.data.data)
    }).catch((error)=>{
      console.log(error.message);
    })
  },[])

  return (
    <>
    <section className='bg-dark'>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src={UserData.image ? UserData.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                <h5 className="my-3">{UserData.name}</h5>
                <p className="text-muted mb-1">{UserData.email}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">Follow</button>
                  <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 py-5">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{UserData.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{UserData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{UserData.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Photo</p>
                  </div>
                  <div className="col-sm-9">
                    <p>{UserData.image ? <h6>&#10003;</h6> : "Please Update Your Photo!!"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <button onClick={()=>{return dispatch(AddUser({user:UserData})),Navigate('/edit-profile')}} type="button" className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default UserProfile
