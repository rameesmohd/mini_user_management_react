import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Home from "../pages/user/home";
import Profile from "../pages/user/Profile";
import Edit_Profile from "../pages/user/Edit_Profile";
import { useSelector } from "react-redux";


function UserRoute() {
    const IsAuth = useSelector((state)=>state.Client)
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/register" element={IsAuth.Token ? <Home /> : <Register />} />
                <Route path="/login" element={IsAuth.Token ? <Home/> : <Login />} />
                <Route path="/user-profile" element={IsAuth.Token ? <Profile/> : <Login/>}/>
                <Route path="/edit-profile" element={IsAuth.Token ? <Edit_Profile/> : <Login/>}/>
            </Routes>
        </div>
    );
}

export default UserRoute;