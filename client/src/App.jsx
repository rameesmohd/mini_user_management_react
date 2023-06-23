import UserRoute from './Routes/UserRoute'
import {Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminRoute from './Routes/AdminRoute'

function App() {
return(
    <>
      <Routes>
        <Route path='/*' element={ <UserRoute/>}/>
        <Route path="/admin/*" element={<AdminRoute/>} />
      </Routes>
    </>
  )
}

export default App
