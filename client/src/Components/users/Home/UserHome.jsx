import React,{useState,useEffect} from 'react'
import userAxios from '../../../Axios/UserAxios'
import './UserHome.css'
import { useSelector } from 'react-redux'

const UserHome = () => {
  // const [name, setName] = useState("");
    const {Token ,Name} = useSelector((store) => store.Client);
    // useEffect(() => {
    //     if (Token) {
    //         userAxios.get("/getDetails", {
    //                 headers: {
    //                     Authorization: `Bearer ${Token}`,
    //                 },
    //             }).then((res) => {
    //                 // setName(res.data.name);
    //             });
    //     }else {
    //         console.log("no token");
    //     }
    // }, []);


  return (
    <div className='container-home'>
      <div className="contents-home">
      <h1>Welcome</h1>
      <h3>{Name}</h3>
      </div>
    </div>
  )
}

export default UserHome
