import {FaUser} from 'react-icons/fa'
import {useRef, useState}from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

function AddClientModal() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
const [addClient]=useMutation(ADD_CLIENT,{
  variables:{
    name,
    email,phone
  },
  update(cache,{data:addClient}){
    const {clients} = cache.readQuery({query:GET_CLIENTS});
    cache.writeQuery({
      query:GET_CLIENTS,
    /*   data:{clients:clients.concat([addClient])} */
    data:{clients:[...clients,addClient]}
    })
  },
  onCompleted:()=>{
   setEmail('')
   setName('')
   setPhone('')
}
})
 
  const handleSubmit = (e) =>{
    e.preventDefault()
    
    if(name === '' || email == '' || phone ==''){
return alert("Please return all fields")
    }
    addClient(name,email,phone)

 
  }
  return (
    <>
    <button type="button" className="bg-green-500 inline-flex gap-2 items-center text-green-50 px-3 py-1 rounded shadow-md" data-bs-toggle="modal" data-bs-target="#addClientModal">
  <FaUser/><p>Add Client</p>
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
              <label className='mb-2'>Email</label>
            <input type="text" placeholder="Enter email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm py-2 px-3 shadow-sm w-full'/>

            </div>
            <div className='mb-8 flex flex-col items-start'>
              <label className='mb-2'>phone</label>
            <input type="text" placeholder="Enter phone number" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className='border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-sm py-2 px-3 shadow-sm w-full'/>

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
    </>  )
}

export default AddClientModal