import {FaList} from 'react-icons/fa'
import {useState}from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'
import Spinner from './Spinner'

function AddProjectModal() {
  const [name,setName]=useState('')
  /* Get clients */
  const {loading, error, data} = useQuery(GET_CLIENTS)
  const [description,setDescription]=useState('')
  const [clientId,setClientId]=useState('')
  const [status,setStatus]=useState('new')

 
  const handleSubmit = (e) =>{
    e.preventDefault()
    
    if(name === '' || description == '' || status ==''){
return alert("Please return all fields")
    }
  
  }

  if (loading) return null
  if(error) return <p>Something went wrong</p>
  return (
    <>
    {
      !loading && !error && (
        <>
         <button type="button" className="bg-orange-500 inline-flex gap-2 items-center text-orange-50 hover:bg-orange-600 px-3 py-1 rounded shadow-md" data-bs-toggle="modal" data-bs-target="#addClientModal">
  <p>Add Project</p>
</button>


<div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add client</h1>
        <button type="button" className="bg-red-600" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div>
          <form onSubmit={handleSubmit}>
            <div className='mb-3 flex flex-col items-start'>
              <label className='mb-2'>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" id="name" className='border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm py-2 px-3 shadow-sm w-full'/>

            </div>
            <div className='mb-3 flex flex-col items-start'>
              <label className='mb-2'>Description</label>
              <textarea
              className='w-full border focus:ring-2 focus:ring-indigo-300 ring-opacity-40 focus:outline-none px-2 py-1' cols="20"
              id="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
           
            </div>
            <div className='mb-3 flex flex-col items-start'>
              <label className='mb-2'>Status</label>
            <select id="status" className='w-full border py-2' value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="new">Not started</option>
              <option value="progress">In Progress started</option>
              <option value="completed">completed</option>
            </select>
            </div>
            <div className='mb-8 flex flex-col items-start'>
              <label className='mb-2'>Client</label>
            <select id="clintId" className='w-full border py-2' value={clientId} onChange={(e)=>setClientId(e.target.value)}>
             <option value="null">Select a client</option>
              {
                data.clients.length ? (
                  data.clients.map((client)=>(
                    <>
                    <option key={client.id} value={client.id}>{client.name}</option>
                    </>
                  ))
                 
                ):
                <p>No clients at the moment</p>
              }
              <option value="new">Not started</option>
              
            </select>
            </div>
            <div className="modal-footer">
        <button type="button" className="bg-red-500 text-red-50 px-3 py-1 rounded-md" data-bs-dismiss="modal">Close</button>
        <button type="submit" data-bs-dismiss="modal" className="btn bg-sky-600 text-sky-50">Submit</button>
      </div>

          </form>
        </div>
      </div>
      
    </div>
  </div>
</div>
        </>
      )
    }
   
    </>  )
}

export default AddProjectModal