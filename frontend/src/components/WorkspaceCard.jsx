import { useNavigate } from "react-router-dom";
import "../components/WorkspaceCard.css"


function WorkspaceCard({workspace}){

    const navigate = useNavigate();

    return (
        <> 
        <div className="workspace-card">
            <div onClick={()=>{navigate(`/workspace/${workspace._id}`)}}>
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
            </div>
        </div>
        </>
    );
}

export default WorkspaceCard;