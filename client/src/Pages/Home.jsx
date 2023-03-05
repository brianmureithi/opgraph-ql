import AddClientModal from "../components/AddClientModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";


export default function Home() {
  return (
    <>
     <div className="container w-[90%] mx-auto mt-4">
        <div className="flex flex-row ga-3 mb-4">
        <AddClientModal/>
        </div>
   
      <Projects/>
      <Clients/>

    </div>
    </>
  )
}
