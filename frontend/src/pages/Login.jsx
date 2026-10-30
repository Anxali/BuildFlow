import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event){
        console.log("handleLogin called");
        event.preventDefault();

        const response = await fetch("http://localhost:3000/api/auth/login",{method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email:email, password: password}), credentials:"include"});

        const data = await response.json();

        if(!response.ok) {
            alert(data.message);
            return;
        }

        alert("Login Successful!")
        console.log(data);

    
    }

    return (
        <div>
            <h1>Login to BuildFlow</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;