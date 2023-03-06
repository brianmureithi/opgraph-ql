import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from "./ProjectCard"
export default function Projects() {

    const {loading, error, data} =useQuery(GET_PROJECTS)

    if (loading) return <Spinner/>
    if(error)return <p>Something went wrong</p>
  return (
   <>
   {
    data.projects.length ? 
    <div className="flex flex-row flex-wrap gap-y-6 gap-x-2 justify-evenly items-start my-4">
        {data.projects.map((project)=>(
            <ProjectCard key={project.id} project={project}/>
        ))}
    </div>

    :
    <p>No projects</p>
   }
   </>
  )
}
