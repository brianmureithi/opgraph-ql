import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa"

export default function ClientInfo({client}) {
    console.log(client)
  return (
    <div className="w-[60%] mx-auto mt-4 border-t pt-2">
        {
            client ?
            <div className="flex flex-col ">

            <p className="mb-1 font-semibold inline-flex items-center gap-x-2"><FaIdBadge/>{client.name}</p>
            <p className="mb-1 font-light inline-flex items-center gap-x-2"><FaEnvelope/>{client.email}</p>
            <p className="font-light text-red-600 inline-flex items-center gap-x-2"><FaPhone/>{client.phone}</p>
        </div>:
        <p>No client for this project</p>
        }
  
    </div>
  )
}
