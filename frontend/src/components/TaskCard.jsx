import { useNavigate } from "react-router-dom";

function TaskCard({task}){
    const navigate = useNavigate();

    return (
        <div onClick={()=>navigate(`/task/${task._id}`)}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    )

}

export default TaskCard;