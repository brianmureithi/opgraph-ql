import {FaExclamationTriangle} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center mt-5'>
        <FaExclamationTriangle className='text-red-500 '  size="5em"/>
        <h1 className='font-bold text-xl'>404</h1>
        <p className='mt-2'>Sorry, this page does not exist</p>
        <Link className="bg-sky-500 px-2 py-1 rounded text-sky-50 mt-6" to='/'>Back home</Link>
    </div>
  )
}
