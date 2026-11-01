import { useNavigate } from "react-router-dom";


function Navbar(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/auth/logout", {method: "POST"}, {credentials: "include"});

        if(!response.ok) {
            alert("Logout failed");
            return;
        }

        navigate("/login");
    }
    return (
        <nav>
            <h2>BuildFlow</h2>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;