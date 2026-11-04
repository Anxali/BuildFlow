import { useNavigate } from "react-router-dom";


function WorkspaceCard({workspace}){

    const navigate = useNavigate();

    return (
        <>
            <div onClick={()=>{navigate(`/workspace/${workspace._id}`)}}>
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
            </div>
        </>
    );
}

export default WorkspaceCard;