import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/Notes/NoteContext";

const Signup = () => {
    const { showAlert } = useContext(NoteContext);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });
    const [error, setError] = useState(""); // Keep local error state if you want form-specific errors
    let navigate = useNavigate();
    const host = "http://localhost:5000";

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !credentials.name ||
            !credentials.email ||
            !credentials.password ||
            !credentials.cpassword
        ) {
            showAlert("Please fill in all fields.", "danger");
            return;
        }

        if (credentials.password !== credentials.cpassword) {
            showAlert("Passwords do not match.", "danger");
            return;
        }

        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                showAlert("Signup successful! Please log in.", "success");
                navigate("/login"); // Changed to /login as per previous fix
            } else {
                showAlert(json.error || "Signup failed. Please try again.", "danger");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            showAlert("Something went wrong. Please try again.", "danger");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-center mb-4">Create Account</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="cpassword"
                                    name="cpassword"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;