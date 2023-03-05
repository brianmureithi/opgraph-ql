import { useMutation } from "@apollo/client"
import { DELETE_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"
export default function ClientsRow({client}) {
    /* Use mutation for delete */
    const [deleteClient]=useMutation(DELETE_CLIENT,{
        variables:{id:client.id},
        onCompleted:()=>{
            console.log("Client deleted successfully")
        },
        onError:(error)=>{
            console.error(error)
        },
      /*   refetchQueries:[{query:GET_CLIENTS}] */
      update(cache,{data:{deleteClient}}){
        const {clients} = cache.readQuery({
            query:GET_CLIENTS
        })
        cache.writeQuery({
            query:GET_CLIENTS,
            data:{clients:clients.filter(client=>client.id !== deleteClient.id)}
        })

      }
})


    const handleDelete = async ()=>{
        try{
            await deleteClient()

        }
        catch(error){
            console.log(error)

        }
    }


  return (
    <tr
    key={client.id}
    className="hover:bg-gray-100 border-b border-gray-200 py-4"
  >
    <td className="py-3 px-6 text-left">{client.name}</td>
    <td className="py-3 px-6 text-left">{client.email}</td>
    <td className="py-3 px-6 text-left">{client.phone}</td>
    <td className="py-3 px-6 text-left">
        <div className="flex justify-evenly">
    <button className="bg-sky-500 text-sky-50 px-3 py-1 rounded-md hover:bg-sky-600">Edit</button>
    <button onClick={handleDelete} className="bg-red-500 text-red-50 px-3 py-1 rounded-md hover:bg-red-600">Delete</button></div></td>
 
  </tr>
  )
}
