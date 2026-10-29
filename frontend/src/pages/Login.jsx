import { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event){
        console.log("handleLogin called");
        event.preventDefault();
        console.log(email,password);
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