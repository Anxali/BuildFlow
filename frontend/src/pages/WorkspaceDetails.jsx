import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function WorkspaceDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [workspace, setWorkspace] = useState(null);
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");
    const [workspaceDescription, setWorkspaceDescription] = useState("");

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

    function startEditing() {
        setWorkspaceName(workspace?.name)
        setWorkspaceDescription(workspace?.description)
        setIsEditing(true)
    }

    async function handleSaveEdit() {
        const response = await fetch(`http://localhost:3000/api/workspace/update/${id}`, {method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name: workspaceName, description: workspaceDescription}), credentials:"include"})
        const data = await response.json();

        if(!response.ok){
            return console.log(data.message);
        }

        setWorkspace(data.workspace)
        setIsEditing(false)

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

            {isEditing ? (<>
            <input type="text" value={workspaceName} onChange={(e)=>{setWorkspaceName(e.target.value)}} />
            <textarea value={workspaceDescription} onChange={(e)=>{setWorkspaceDescription(e.target.value)}}></textarea>
            <button onClick={handleSaveEdit}>save</button><button onClick={()=>{setIsEditing(false)}}>cancel</button>
            </>) : (<><p>Workspace name: {workspace?.name}</p>
            <p>Workspace description: {workspace?.description}</p></>) }

            <h2> Projects </h2>
            { projects.length === 0 ? <p>No projects found!</p> :
            projects.map((project)=>{
                return (
                    <ProjectCard key={project._id} project={project} />
                )
            })
        }
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

            <button onClick={startEditing}>Edit Workspace</button><button>Delete workspace</button>
        </div>
    )
}

export default WorkspaceDetails;