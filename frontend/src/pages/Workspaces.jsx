import WorkspaceCard from "../components/WorkspaceCard";
import { useState, useEffect } from "react";

function Workspaces() {

    const [workspaces, setWorkspaces]=useState([])
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function fetchWorkspaces() {
        const response = await fetch("http://localhost:3000/api/workspace/get",{credentials:"include"});
        const data = await response.json();
        if(!response.ok) {console.log(data.message); return;}
        console.log(data);
        setWorkspaces(data.workspaces);
    }

    useEffect(()=>{
        fetchWorkspaces();
    },[]);
    
    async function handleCreateWorkspace(){
        console.log("Workspace Name", name);
        console.log("Workspace Description", description);
        const response = await fetch("http://localhost:3000/api/workspace/create", {method:"PUT", headers: {"Content-Type": "application/json"}, credentials:"include", body: JSON.stringify({name:name, description:description})});
        console.log("Response", response);
        const data = await response.json();
        console.log(data);
        if(response.ok){await fetchWorkspaces(); setName(""); setDescription(""); setShowForm(false);}
    }

    return (
        <div>
            <h1>My Workspaces</h1>

            <button onClick={()=>{setShowForm(true);}}> + Create New Workspace </button>

            {showForm && (
                <div>
                    <h3>Create Workspace</h3>
                    <input type="text" placeholder="Workspace Name" value={name} onChange={(e)=>{setName(e.target.value)}}  />
                    <textarea placeholder="Workspace Description" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                    <button onClick={handleCreateWorkspace}>Create</button>
                </div>
            )}

            {workspaces.map((workspace)=>(
                <WorkspaceCard key={workspace._id}
                workspace={workspace} />
            ))}
        </div>
    );
}

export default Workspaces;