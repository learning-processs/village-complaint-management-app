import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AutContext } from './context/AutContext'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ProtectedRoute from './componets/common/ProtectedRoute'
import Home from './pages/villager/Home'
import SubmitComplaint from './pages/villager/SubmitComplaint'
import MyComplaint from './pages/villager/MyComplaint'
import ComplaintDetail from './pages/villager/ComplaintDetail'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageComplaints from './pages/admin/ManageComplaints'
import ComplaintView from './pages/admin/ComplaintView'
import AdminProfile from './pages/admin/AdminProfile'
import AdminLogin from './pages/admin/AdminLogin'

const App = () => {

  const { user } = useContext(AutContext);

  return (
    <>
    <Toaster position='top-right' />
    <Routes>

      <Route path='/admin-login' element={
      user?.role === 'admin' ? <Navigate to='/admin' /> : <AdminLogin />} />


      {/* // Public Route */}
      <Route path='/login' element={!user ? <Login/> : <Navigate to='/' /> }/>
      <Route path='/register' element={!user ? <Register/> : <Navigate to='/' /> }/>

      {/* // Villager Routes */}

      <Route path='/' element={ <ProtectedRoute> <Home/> </ProtectedRoute> } />
      <Route path='/submit' element={ <ProtectedRoute> <SubmitComplaint/> </ProtectedRoute> } />
      <Route path='/my-complaints' element={ <ProtectedRoute> <MyComplaint/> </ProtectedRoute> } />
      <Route path='/my-complaint/:id' element={ <ProtectedRoute> <ComplaintDetail/>  </ProtectedRoute> } />

      {/* // Admin Routes */}

      <Route path='/admin' element={ <ProtectedRoute adminOnly={true}> <AdminDashboard/> </ProtectedRoute> } />      
      <Route path='/admin/complaints' element={ <ProtectedRoute adminOnly={true}> <ManageComplaints/> </ProtectedRoute> } />
      <Route path='/admin/complaints/:id' element={ <ProtectedRoute adminOnly={true}> <ComplaintView/> </ProtectedRoute> } />
      <Route path='/admin/profile' element={ <ProtectedRoute adminOnly={true}> <AdminProfile/>  </ProtectedRoute> } />

      <Route path='*' element={ <Navigate to='/' />} />
    </Routes>
    </>
  )
}

export default App
