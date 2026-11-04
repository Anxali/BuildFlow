import { useParams, useState } from "react-router-dom";

function WorkspaceDetails() {

    const { id } = useParams();
    const [workspace, setWorkspace] = useState(null);

    useEffect(()=>{
        async function fetchWorkspaceDetails() {
            const response = await fetch(`http://localhost:3000/api/workspace/get/${id}`, {credentials: "include"});

            const data = await response.json();

            if(!response.ok){
                console.log(data.message);
                return;
            }

            setWorkspace(data.workspace);
            
        } fetchWorkspaceDetails();
    }, [id]);

    return (
        <div>
            <h1>Workspace Details</h1>
            <p>Workspace id: {id}</p>
        </div>
    )
}

export default WorkspaceDetails;