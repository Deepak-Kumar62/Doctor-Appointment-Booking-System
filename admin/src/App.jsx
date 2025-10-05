import { useContext, useEffect, useState } from 'react'
import { AdminContext } from './contexts/AdminContext';
import { DoctorContext } from './contexts/DoctorContext';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';




const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext)

 

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex'>
        <Sidebar />
        <Routes>
          {/* admin route */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/* doctor route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />

        </Routes>
      </div>

    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App