import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TaskDetails() {

    const {id} = useParams();
    const [task, setTask] = useState({});
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const statuses = ["ToDo", "In Progress", "Done", "Blocked", "Cancelled", "Backlog"];

    async function fetchTaskDetails(){
        const response = await fetch(`http://localhost:3000/api/task/get/${id}`, {credentials:"include"})
        const data = await response.json();

        setTask(data.task);
    }

    async function handleAddComment(){}

    async function handleUpdateStatus(){

    }

    async function handleEditTask(){}

    async function handleDeleteTask(){}

    useEffect(()=>{
        fetchTaskDetails();
    },[id])

    return(
        <>

            <h1>Task Details</h1>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Assignee: {task.assignee}</p>
            <p>Comments: {task.comments}</p>
            <button onClick={handleAddComment}>add comments</button>
            <p>Status: {task.status}</p>
            <button onClick={()=>setShowStatusDropdown(!showStatusDropdown)}>update status</button>
            {showStatusDropdown && 
                <div>{statuses.map((status)=>{
                    return <button key={status}>{status}</button>
                })}</div>
            }
            <p>Created By: {task.createdBy}</p>
            <p>Created At: {task.createdAt}</p>
            <p>Priority: {task.priority}</p>

            <button onClick={handleEditTask}>edit task</button>

            <button onClick={handleDeleteTask}>DELETE task</button>
            
        </>
    )
}

export default TaskDetails