import { useNavigate } from "react-router-dom";

function ProjectCard({project}){
    const navigate = useNavigate();

    return (
        <div onClick={()=>{navigate(`/project/${project._id}`)}}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>

        </div>
    )
}

export default ProjectCard;