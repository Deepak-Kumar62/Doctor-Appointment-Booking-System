import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-600 '>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simplify browse through extensive list of trusted doctors, schedule your appointment hassle-free</p>
            <div className='flex gap-4 sm:justify-center pt-5 w-full overflow-scroll '>
                {specialityData.map((item, index) => (
                    <Link onClick={() => scrollTo(0,0)} key={index} className='flex flex-col justify-center items-center text-sm cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'  to={`/doctors/${item.speciality}`}>
                        <img className='w-16 sm:w-24  mb-2' src={item.image} alt={item.name} />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu