import {
    createContext,
    useEffect,
    useState
} from "react";

import {
    login as loginRequest,
    register as registerRequest,
    getCurrentUser
} from "../serivces/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /*
     * Restore authentication when the application starts.
     */

    useEffect(() => {
        async function restoreAuthentication() {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getCurrentUser();

                setUser(data.user);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }

        restoreAuthentication();
    }, []);

    /*
     * Login
     */

    async function login(credentials) {
        const data = await loginRequest(credentials);

        localStorage.setItem("token", data.token);

        setUser(data.user);
        setIsAuthenticated(true);

        return data;
    }

    /*
     * Register
     */

    async function register(userData) {
        const data = await registerRequest(userData);

        return data;
    }

    /*
     * Logout
     */

    function logout() {
        localStorage.removeItem("token");

        setUser(null);
        setIsAuthenticated(false);
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
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