import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { GET_PROJECTS } from "../queries/projectQueries"
import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/projectMutations"

export default function DeleteProjectButton({projectId}) {
    const navigate = useNavigate()

    const [deleteproject]=useMutation(DELETE_PROJECT,{
        variables:{id:projectId},
        onCompleted:()=>{
            navigate('/')
        },
        refetchQueries:[{query:GET_PROJECTS}]
    })
  return (
    <div className="">
        <button
        onClick={deleteproject}
         className="bg-red-500 text-red-50 inline-flex items-center gap-x-2
          hover:bg-red-600 rounded shadow-md px-3 py-2"><FaTrash/> <p>Delete</p></button>
    </div>
  )
}
