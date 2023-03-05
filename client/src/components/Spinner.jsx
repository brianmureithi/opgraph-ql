import React from 'react'
import {FaSpinner} from 'react-icons/fa'

export default function Spinner() {
  return (
    <div className='p-3 flex items-baseline gap-2'>
        <FaSpinner className=" animate-spin "/> <p>Loading Please wait...</p>
    </div>
  )
}
