import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import userAxios from '../../../Axios/UserAxios';
import Swal from 'sweetalert2';

const EditProfile = () => {
    const {User,Token }=useSelector((state)=>state.Client)
    const [img, setImg] = useState('');
    const [picture, setPicture] = useState('');
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const Navigate = useNavigate()

    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    const imageConverter = () => {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
          setPicture(reader.result);
      }}

    img ? imageConverter() : null;

    if(!Token){
      Navigate('/')
    }

    const updateProfile =(e)=>{
        userAxios.post('/update-profile',{
          name: name ? name : User.name,
          email : email ? email : User.email,
          phone : phone ? phone : User.phone,
          image : picture ? picture : User.image,
          },{headers : {Authorization : Token}}
          ).then((res)=>{
            if (res.data.status === "success") {
              Toast.fire({
                  icon: "success",
                  title: "Profile updated",
              }).then(() => {
                  Navigate("/user-profile");
              });
          } else {
              Toast.fire({
                  icon: "error",
                  title: "Somthing went wrong",
              }).then(() => {
                  Navigate("/");
              });
        }})
    }


  return (
    <>
    <section className='bg-dark'>
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 py-5">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name :</p>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" placeholder={User.name} 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" placeholder={User.email}
                     value={email}
                     onChange={(e)=>{setEmail(e.target.value)}} />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" placeholder={User.phone}
                     value={phone}
                     onChange={(e)=>{setPhone(e.target.value)}} />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">  
                       
                    <img id="imagePreview" style={{width:150,height:180}} src={img ? `${URL.createObjectURL(img)}` : User?.image }
                        className="avatar" /></p>
                  </div>
                  <div className="col-sm-9">
                    <p> "Please Update Your Photo!!"</p>
                    <input type="file" name="photo"
                      acceptedFiles=".jpg,.jpeg,.png" id="file" 
                      onChange={(e)=>setImg(e.target.files[0])} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <button onClick={()=>updateProfile()} type="button" className="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default EditProfile
