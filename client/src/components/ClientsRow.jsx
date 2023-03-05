
export default function ClientsRow({client}) {
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
    <button className="bg-red-500 text-red-50 px-3 py-1 rounded-md hover:bg-red-600">Delete</button></div></td>
 
  </tr>
  )
}
