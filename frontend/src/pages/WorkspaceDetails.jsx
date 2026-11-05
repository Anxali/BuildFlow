import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WorkspaceDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [workspace, setWorkspace] = useState(null);
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function fetchProjects() {
            const response = await fetch(`http://localhost:3000/api/project/get/workspace/${id}`, {credentials: "include"});
            const data = await response.json();

            if(!response.ok){
                console.log(data.message);
                return;
            }

            setProjects(data.projects);
    }


    async function handleProjectCreate() {
        const response = await fetch(`http://localhost:3000/api/project/create`, {credentials: "include", method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name:name, description:description, workspace: id})});
        const data = await response.json();

        if(!response.ok){
            return console.log(data.message);
        }

        await fetchProjects();
        setName("");
        setDescription("");
        setShowForm(false);

    }

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
 
        fetchProjects();

    }, [id]);

    return (
        <div>
            <button onClick={()=>navigate(-1)}>back</button>
            <h1>Workspace Details</h1>
            <p>Workspace name: {workspace?.name}</p>

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
            
            <button onClick={()=>{setShowForm(true)}}> +Create Project </button>

            {showForm && (
                <div>
                    <h3>Create Project</h3>
                    <input type="text" placeholder="Project Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <textarea placeholder="Project Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                    <button onClick={handleProjectCreate}>Create</button>
                    <button onClick={()=>{setShowForm(false)}}>Cancel</button>
                </div>
            )}
        </div>
    )
}

export default WorkspaceDetails;