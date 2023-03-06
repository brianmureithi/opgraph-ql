import { useMutation } from '@apollo/client'
import {useState} from 'react'
import { FaEdit } from 'react-icons/fa'
import { EDIT_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECT } from '../queries/projectQueries'




export default function EditProject({project}) {
    const [name,setName]=useState(project.name)
    const [description,setDescription]=useState(project.description)
    const [status,setStatus]=useState('new')

    const [updateProject] =useMutation(EDIT_PROJECT,{
      variables:{id:project.id, name,description,status},
      refetchQueries:[{query:GET_PROJECT, variables:{id:project.id}}]
    })

    const handleSubmit = (e) =>{
      e.preventDefault()
      updateProject(name,description,status)

    }
  return (
    <div>
        
    <button
    /*     onClick={deleteproject} */
         className="bg-purple-500 text-purple-50 inline-flex items-center gap-x-2
          hover:bg-purple-600 rounded shadow-md px-3 py-2" data-bs-toggle="modal" data-bs-target="#editProjectModal"><FaEdit/> <p>Edit</p></button>
     

     <div className="modal fade" id="editProjectModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Project</h1>
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
              placeholder='Enter description'
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
         
            <div className="modal-footer">
        <button type="button" className="bg-red-500  text-red-50 px-3 py-1 rounded-md" data-bs-dismiss="modal">Close</button>
        <button type="submit" data-bs-dismiss="modal" className="btn bg-sky-600 hover:border hover:border-sky-500 text-sky-50">Submit</button>
      </div>

          </form>
        </div>
      </div>
      
    </div>
  </div>
</div>
    </div>
  )
}
