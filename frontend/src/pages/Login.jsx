import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/variables.css"
import "./Login.css"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event){
        console.log("handleLogin called");
        event.preventDefault();

        const response = await fetch("http://localhost:3000/api/auth/login",{method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email:email, password: password}), credentials:"include"});

        const data = await response.json();

        if(!response.ok) {
            alert(data.message);
            return;
        }

        //alert("Login Successful!");
        navigate("/workspaces");
        console.log(data);

    
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div>
                <h1 className="login-heading">Login to BuildFlow</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input data-testid="input-email" type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input data-testid="input-password" type="password" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button data-testid="button-login" type="submit">Login</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login;