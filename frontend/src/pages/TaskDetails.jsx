import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TaskDetails() {

    const {id} = useParams();
    const [task, setTask] = useState({});

    async function fetchTaskDetails(){
        const response = await fetch(`http://localhost:3000/api/task/get/${id}`, {credentials:"include"})
        const data = await response.json();

        setTask(data.task);

    }

    useEffect(()=>{
        fetchTaskDetails();
    },[id])

    

    return(
        <>

            <h1>Task Details</h1>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.assignee}</p>
            <p>{task.comments}</p>
            <p>{task.status}</p>
            <p>{task.createdBy}</p>
            <p>{task.createdAt}</p>
            <p>{task.priority}</p>
            
        </>
    )
}

export default TaskDetails