import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    }

    function validate() {

        const newErrors = {};

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.name.trim() === "") {
            newErrors.name = "Name is required";
        }

        if (formData.email.trim() === "") {
            newErrors.email = "Email is required";
        }
        else if (!emailPattern.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (formData.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (
            formData.confirmPassword !== formData.password
        ) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        return newErrors;
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const newErrors = validate();

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {

            /*
             * Backend registration will eventually happen here.
             *
             * register(formData)
             */

            console.log("Registration data:", formData);

            navigate("/");

        } finally {

            setIsSubmitting(false);

        }
    }

    return (
        <main className="auth-page">

            <section className="auth-card">

                <header className="auth-header">

                    <h1>AI Expense Tracker</h1>

                    <h2>Create Account</h2>

                    <p>
                        Start managing your finances today.
                    </p>

                </header>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                        />

                        {errors.name && (
                            <p className="form-error">
                                {errors.name}
                            </p>
                        )}

                    </div>

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
                            placeholder="Create a password"
                            autoComplete="new-password"
                        />

                        {errors.password && (
                            <p className="form-error">
                                {errors.password}
                            </p>
                        )}

                    </div>

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                        />

                        {errors.confirmPassword && (
                            <p className="form-error">
                                {errors.confirmPassword}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </section>

        </main>
    );
}

export default Register;