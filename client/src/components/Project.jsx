import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import Spinner from './Spinner'
import {Link, useParams} from 'react-router-dom'
import ClientInfo from './ClientInfo'


export default function Project() {
    const {id}= useParams();

    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables:{
            id
        }
    })
    if(loading)return <Spinner/>
    if(error) return <p>Something went wrong</p>
  return (
    <div className='w-[80%] border mx-auto mt-4 relative min-h-[50vh]'>
        <div className='absolute top-6 right-6'>
            <Link to='/' className='border px-3 py-1 rounded hover:bg-slate-50'>Back</Link>
        </div>
        <div className='w-[60%] mx-auto mt-10'>
       <p className='font-bold tracking-wider text-xl'> {data.project.name}</p>
       <p className='font-normal tracking-wider text-base mt-2'> {data.project.description}</p>
       <p className='font-normal tracking-wide text-base mt-6'>Status: <span className='font-semibold'>{data.project.description}</span> </p>
        </div>

        <ClientInfo client={data.project.client}/>
       
        </div>
  )
}
