import apiRequest from "./api";

async function register(userData) {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

async function login(credentials) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    });
}

async function getCurrentUser() {
    return apiRequest("/auth/me");
}

export {
    register,
    login,
    getCurrentUser
};