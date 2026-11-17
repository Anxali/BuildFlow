import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AppLayout.css";

function AppLayout() {
    return (
        <div className="app-layout">
            <Navbar />
            <div className="app-workspace">
                <aside className="app-sidebar">
                    <p className="sidebar-eyebrow">YOUR WORK</p>
                    <nav className="sidebar-nav" aria-label="Main navigation">
                        <NavLink className="sidebar-link" to="/workspaces">
                            <span className="sidebar-link-icon" aria-hidden="true" />
                            <span>Workspaces</span>
                        </NavLink>
                    </nav>
                </aside>
                <main className="app-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;