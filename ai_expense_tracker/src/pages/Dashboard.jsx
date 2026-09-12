import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar.jsx";
import Header from "../components/common/Header.jsx";

function Dashboard() {

    return (
        <div className="dashboard-layout">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="dashboard-main">

                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="dashboard-content">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default Dashboard;