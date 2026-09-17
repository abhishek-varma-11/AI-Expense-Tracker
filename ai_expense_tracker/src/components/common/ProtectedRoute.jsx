import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
    const {
        isAuthenticated,
        isLoading
    } = useAuth();

    

    if (isLoading) {
        return (
            <main className="auth-loading">
                <p>Checking authentication...</p>
            </main>
        );
    }

    

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    

    return children;
}

export default ProtectedRoute;