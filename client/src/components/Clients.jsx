import React from 'react'
import {gql, useQuery} from '@apollo/client'
import ClientsRow from './ClientsRow';
import {GET_CLIENTS} from '../queries/clientQueries'
import Spinner from './Spinner';




export default function Clients() {

    const { loading, error, data } = useQuery(GET_CLIENTS);
    if (loading)return <Spinner/>
    if (error)return <p>Something went wrong...</p>
  return (
  <> 
  <div className="mx-auto w-full">
    <h1 className='my-2 font-semibold text-xl'>All clients</h1>
      <table className=" border-collapse w-full ">
        <thead>
          <tr className="bg-gray-300 text-gray-700">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
        <ClientsRow client={client} key={client.id}/>
          ))}
        </tbody>
      </table>
    </div>
  
  </>
  )
}
