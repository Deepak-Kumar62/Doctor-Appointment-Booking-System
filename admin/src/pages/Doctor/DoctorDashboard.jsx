import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../contexts/DoctorContext'
import { AppContext } from '../../contexts/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const { dToken, DashboardData, getDashboardData, CancelAppointment, CompleteAppointment } = useContext(DoctorContext)
  const { slotDataFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashboardData()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency}{DashboardData.earnings}</p>
            <p className='text-gray-500'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{DashboardData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{DashboardData.patients}</p>
            <p className='text-gray-500'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {DashboardData.latestAppointments && DashboardData.latestAppointments.length > 0 ? (
            DashboardData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200'>
                <img className='w-10 rounded-full bg-gray-100' src={item?.userData?.image} alt={item?.userData?.name} />
                <div className='flex-1 text-sm'>
                  <p className='font-medium text-gray-800'>{item?.userData?.name}</p>
                  <p className='text-sm text-gray-600'>{slotDataFormat(item?.slotDate)}</p>
                </div>

                {item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <div className="flex items-center gap-2">
                        <img onClick={() => CancelAppointment(item._id)} className="w-10 cursor-pointer hover:scale-105 transition" src={assets.cancel_icon} alt="Cancel" />
                        <img onClick={() => CompleteAppointment(item._id)} className="w-10 cursor-pointer hover:scale-105 transition" src={assets.tick_icon} alt="tick_icon" />
                      </div>
                }
              </div>
            ))
          ) : (
            <p className='text-center py-4 text-gray-500'>No latest appointments available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
