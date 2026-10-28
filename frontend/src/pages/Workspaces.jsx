import WorkspaceCard from "../components/WorkspaceCard";
import { useState, useEffect } from "react";

function Workspaces() {

    const [workspaces, setWorkspaces]=useState([])
    useEffect(()=>{},[]);
    

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