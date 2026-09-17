import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Sidebar() {
    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/", { replace: true });
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1>AI Expense Tracker</h1>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard">
                    Overview
                </NavLink>

                <NavLink to="/dashboard/transactions">
                    Transactions
                </NavLink>

                <NavLink to="/dashboard/analytics">
                    Analytics
                </NavLink>

                <NavLink to="/dashboard/profile">
                    Profile
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;