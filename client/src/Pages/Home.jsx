import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";


export default function Home() {
  return (
    <>
     <div className="container w-[90%] mx-auto mt-4">
        <div className="flex flex-row gap-x-3 mb-4">
          <AddProjectModal/>
        <AddClientModal/>
        </div>
   
      <Projects/>
      <Clients/>

    </div>
    </>
  )
}
