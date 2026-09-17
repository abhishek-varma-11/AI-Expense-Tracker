import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import useAuth from "../hooks/useAuth";

function Login() {
    const navigate = useNavigate();

    const {
        login,
        isAuthenticated
    } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

        /*
         * Clear the server error when the user
         * starts changing the form again.
         */

        if (serverError) {
            setServerError("");
        }
    }

    function validate() {
        const newErrors = {};

        if (formData.email.trim() === "") {
            newErrors.email = "Email is required";
        }

        if (formData.password === "") {
            newErrors.password = "Password is required";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setServerError("");

        const newErrors = validate();

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            await login({
                email: formData.email,
                password: formData.password
            });

            navigate("/dashboard");
        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    /*
     * If the user is already authenticated,
     * don't show the login form again.
     */

    if (isAuthenticated) {
        navigate("/dashboard", {
            replace: true
        });

        return null;
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <header className="auth-header">
                    <h1>AI Expense Tracker</h1>

                    <h2>Welcome Back</h2>

                    <p>
                        Login to manage your finances.
                    </p>
                </header>

                {serverError && (
                    <div className="form-server-error">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />

                        {errors.email && (
                            <p className="form-error">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                        {errors.password && (
                            <p className="form-error">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}

                    <Link to="/register">
                        Create an account
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login; 