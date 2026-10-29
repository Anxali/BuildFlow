import WorkspaceCard from "../components/WorkspaceCard";
import { useState, useEffect } from "react";

function Workspaces() {

    const [workspaces, setWorkspaces]=useState([])
    useEffect(()=>{
        async function fetchWorkspaces() {
            const response = await fetch("http://localhost:3000/api/workspace/getAll",{credentials:"include"});
            const data = await response.json();
            if(!response.ok) {console.log(data.message); return;}
            console.log(data);
            setWorkspaces(data.workspaces);
        }   
        
        fetchWorkspaces();
    },[]);
    

    return (
        <div>
            <h1>My Workspaces</h1>

            {workspaces.map((workspace)=>(
                <WorkspaceCard key={workspace._id}
                workspace={workspace} />
            ))}
        </div>
    );
}

export default Workspaces;