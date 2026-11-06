import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    async function fetchTasks() {
        const response = await fetch(`http://localhost:3000/api/task/get/project/${id}`, {credentials: "include"})
        const data = await response.json();

        if(!response.ok){
            console.log(data.message);
            return;
        }

        setTasks(data.tasks);
    }

    useEffect(()=>{fetchTasks()},[id])

    return (
        <div>

            <button onClick={()=>navigate(-1)}>back</button>
            <h1>Project Details</h1>

            <h3>Tasks</h3>

            {tasks.length === 0 ? <p>No tasks.</p> : tasks.map((task)=>{
                return (<TaskCard key={task._id} task={task}/>)
            })}

        </div>
    )

}

export default ProjectDetails;