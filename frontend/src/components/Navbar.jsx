import { useNavigate } from "react-router-dom";
import "../components/Navbar.css"

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/auth/logout", {method: "POST", credentials: "include"});

        if(!response.ok) {
            alert("Logout failed");
            return;
        }

        navigate("/login");
    }
    return (
        <nav className="nav-container">
            <h2 className="heading">BuildFlow</h2>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;