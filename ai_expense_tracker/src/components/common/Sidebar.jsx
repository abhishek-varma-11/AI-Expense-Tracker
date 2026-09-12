import { NavLink } from "react-router-dom";

function Sidebar() {

    return (
        <aside className="sidebar">

            {/* Application name */}
            <div className="sidebar-header">
                <h1>AI Expense Tracker</h1>
            </div>

            {/* Main navigation */}
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

            {/* Sidebar footer */}
            <div className="sidebar-footer">

                <button type="button">
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;