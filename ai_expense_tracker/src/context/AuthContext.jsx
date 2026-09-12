import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(userData) {
        setUser(userData);
        setIsAuthenticated(true);
    }

    function logout() {
        setUser(null);
        setIsAuthenticated(false);
    }

    const value = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;