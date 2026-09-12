import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Overview from "./pages/Overview.jsx";
import Transactions from "./pages/Transactions.jsx";
import TransactionDetails from "./pages/TransactionDetails.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";

import NotFound from "./pages/NotFound.jsx";

import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

function App() {
    return (
        <Routes>

            {/* Authentication */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Dashboard */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<Overview />}
                />

                <Route
                    path="transactions"
                    element={<Transactions />}
                />

                <Route
                    path="transactions/:id"
                    element={<TransactionDetails />}
                />

                <Route
                    path="analytics"
                    element={<Analytics />}
                />

                <Route
                    path="profile"
                    element={<Profile />}
                />
            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default App;