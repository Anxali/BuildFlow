import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetails() {

    const {id} = useParams();
    const [task, setTask] = useState({});
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [showCommentForm, setShowCommentForm] = useState(false); 
    const [commentText, setCommentText] = useState("");
    const statuses = ["ToDo", "In Progress", "Done", "Blocked", "Cancelled", "Backlog"];
    const navigate = useNavigate();

    async function fetchTaskDetails(){
        const response = await fetch(`http://localhost:3000/api/task/get/${id}`, {credentials:"include"})
        const data = await response.json();

        setTask(data.task);
    }

    async function handleAddComment(){
        const response = await fetch(`http://localhost:3000/api/task/comment/${id}`, {method:'PUT', headers:{'Content-type':'application/json'},body:JSON.stringify({text:commentText}), credentials:"include"});
        const data = await response.json();

        if(!response.ok){
            return console.log(data.message);
        }

        setCommentText("")
        setShowCommentForm(false)
        setTask(prevTask=>({...prevTask, comments: data.comments}))

    }

    async function handleUpdateStatus(newStatus){
        const response = await fetch(`http://localhost:3000/api/task/update/${id}`, {method:"PATCH", headers:{'Content-type':'application/json'}, body:JSON.stringify({status: newStatus}), credentials:"include"});
        const data = await response.json();
        if(!response.ok){
            console.log(data.message); return;
        }

        setTask(data.task);
    }

    function startEditing(){
        setTitle(task.title);
        setDescription(task.description);
        setAssignee(task.assignee);
        setPriority(task.priority);

        setIsEditing(true);
    }

    function cancelEdit(){
        setIsEditing(false);
    }

    async function handleSaveEdit(){
        const response = await fetch(`http://localhost:3000/api/task/update/${id}`, {method:"PATCH", headers:{'Content-type':'application/json'}, body:JSON.stringify({title, description, assignee, priority}), credentials:"include"});
        const data = await response.json();

        if(!response.ok){
            return console.log(data.message);
        }

        setTask(data.task);
        setIsEditing(false);
    }

    async function handleDeleteTask(){
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;
        
        const response=await fetch(`http://localhost:3000/api/task/delete/${id}`, {method:"DELETE", credentials:"include"})
        const data = await response.json()

        if(!response.ok){
            return console.log(data.message)
        }

        navigate(-1)
    }

    useEffect(()=>{
        fetchTaskDetails();
    },[id])

    return(
        <>

            <h1>Task Details</h1>
            {isEditing ? (<>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <input value={assignee} onChange={(e) => setAssignee(e.target.value)}/>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button onClick={handleSaveEdit}>save</button> <button onClick={cancelEdit}>cancel</button>
                </>) : 
            
                (<>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Assignee: {task.assignee}</p>
                    <p>Priority: {task.priority}</p>
                </>)}
            
            <h3>Comments: </h3>
            <ul>
                {(task.comments ?? []).map((comment)=>(
                    <li key={comment._id}>{comment.text}</li>
                ))}
            </ul>
            <button onClick={()=>{setShowCommentForm(true)}}>add comments</button>
            {showCommentForm && <div>
                    <textarea value={commentText} onChange={(e)=>{setCommentText(e.target.value)}} placeholder="Enter a comment"/>
                    <button onClick={handleAddComment}>post</button><button onClick={()=>{setShowCommentForm(false)}}>cancel</button>
                </div>}
            <p>Status: {task?.status}</p>
            <button onClick={()=>setShowStatusDropdown(!showStatusDropdown)}>update status</button>
            {showStatusDropdown && 
                <div>{statuses.map((status)=>{
                    return <button key={status} onClick={()=>{setShowStatusDropdown(false); handleUpdateStatus(status);}}>{status}</button>
                })}</div>
            }
 
            <p>Created By: {task.createdBy}</p>
            <p>Created At: {task.createdAt}</p>

            <button onClick={startEditing}>edit task</button>
            

            <button onClick={handleDeleteTask}>DELETE task</button>
            
        </>
    )
}

export default TaskDetails