// import { assets } from "../assets/assets.js";
// import { useContext } from 'react';
// import { AdminContext } from '../contexts/AdminContext.jsx';
// import { useNavigate } from 'react-router-dom';
// import { DoctorContext } from '../contexts/DoctorContext.jsx';
// import DarkModeToggle from "../components/DarkModeToggle.jsx"

// const Navbar = ({ isDarkMode, toggleDarkMode }) => {
//   const { aToken, setAToken } = useContext(AdminContext);
//   const { dToken, setDToken } = useContext(DoctorContext)
//   const navigate = useNavigate()

//   const logout = () => {
//     navigate('/')
//     aToken && setAToken('')
//     aToken && localStorage.removeItem('aToken')

//     dToken && setDToken('')
//     dToken && localStorage.removeItem('dToken')
//   }

//   return (
//     <>
//       <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b'>
//         <div className='flex items-center gap-2 text-xl'>
//           <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
//           <p className='border px-2.5 py-0.3 rounded-full border-gray-500 text-gray-600 dark:text-white'>{aToken ? "Admin" : "Doctor"}</p>
//         </div>
//         <div className='flex gap-6'>
//           <button onClick={logout} className='bg-blue-600 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
//           {/* <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> */}

//         </div>
//       </div>
//     </>
//   )
// }

// export default Navbar


import { assets } from "../assets/assets.js";
import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../contexts/DoctorContext.jsx';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b'>
      <div className='flex items-center gap-2 text-xl'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Logo" />
        <p className='border px-2.5 py-0.3 hidden sm:block rounded-full border-gray-500 text-gray-600'>
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <div className='flex gap-6'>
        <button onClick={logout} className='bg-blue-600 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar;
