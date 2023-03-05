import { Link } from "react-router-dom";

export default function ProjectCard({project}) {
  return (
    <Link to={`/project/${project.id}`}  className="w-1/4 flex flex-col p-3 pb-1 rounded shadow-sm border bg-slate-200 ">
        <h1>{project.name}</h1>
        <div className="mt-3">
            <p>status: <span className="font-semibold">{project.status}</span></p>
        </div>

    </Link>
  )
}
