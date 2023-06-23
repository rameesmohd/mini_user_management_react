import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import AdminHome from '../pages/admin/Home'
import AdminLogin from '../pages/admin/AdminLogin'
import Clients from '../pages/admin/Clients'
import Edit from '../pages/admin/Edit'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const IsAdminAuth = useSelector((state) => state.Admin.Token);
  return (
    <div>
        <Routes>
            <Route path='/' element={IsAdminAuth ? <AdminHome/> : <AdminLogin/>} />
            <Route path='/admin_home' element={IsAdminAuth ? <AdminHome/> : <AdminLogin/>} />
            <Route path='/login' element={IsAdminAuth ? <AdminHome/> : <AdminLogin/>} />
            <Route path="/client_table" element={IsAdminAuth ? <Clients/> :<AdminLogin/>}/>
            <Route path="/user_edit/:id" element={IsAdminAuth ? <Edit/> : <AdminLogin/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoute