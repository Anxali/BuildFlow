import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDecription] = useState("");

    async function fetchTasks() {
        const response = await fetch(`http://localhost:3000/api/task/get/project/${id}`, {credentials: "include"})
        const data = await response.json();

        if(!response.ok){
            console.log(data.message);
            return;
        }

        setTasks(data.tasks);
    }

    async function handleTaskCreation(){
        const response = await fetch(`http://localhost:3000/api/task/create`, {credentials: "include", method:"PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({title:title, description:description, project:id})});
        const data = await response.json();

        console.log(data.tasks);
        if(!response.ok){
            console.log(data.message);
        }

        await fetchTasks();
        setShowForm(false);
        setTitle("");
        setDecription("");

        
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

            <button onClick={()=>setShowForm(true)}>Create Task</button>

            {showForm && (
                <div>
                    <h3>Create task</h3>
                    <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <textarea placeholder="description" value={description} onChange={(e)=>setDecription(e.target.value)}/>
                    <button onClick={handleTaskCreation}>Create</button>
                    <button onClick={()=>setShowForm(false)}>Cancel</button>
                </div>
          
            )}

        </div>
    )

}

export default ProjectDetails;