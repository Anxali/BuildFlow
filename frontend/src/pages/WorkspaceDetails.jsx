import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function WorkspaceDetails() {

    const { id } = useParams();
    const [workspace, setWorkspace] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        async function fetchWorkspaceDetails() {
            const response = await fetch(`http://localhost:3000/api/workspace/get/${id}`, {credentials: "include"});

            const data = await response.json();

            if(!response.ok){
                console.log(data.message);
                return;
            }

            setWorkspace(data.workspace);
            
        }
        fetchWorkspaceDetails();

        async function fetchProjects() {
            const response = await fetch(`http://localhost:3000/api/project/get/workspace/${id}`, {credentials: "include"});
            const data = await response.json();

            if(!response.ok){
                console.log(data.message);
                return;
            }

            setProjects(data.projects);
        }

        fetchProjects();
    }, [id]);

    return (
        <div>
            <h1>Workspace Details</h1>
            <p>Workspace id: {id}</p>

            <h2> Projects </h2>
            { projects.length === 0 ? <p>No projects found!</p> :
            projects.map((project)=>{
                return (
                    <div key={project._id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                )
            })}
            
        </div>
    )
}

export default WorkspaceDetails;