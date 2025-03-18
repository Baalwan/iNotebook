import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/Notes/NoteContext";

const Login = () => {
    const { showAlert } = useContext(NoteContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const host = "http://localhost:5000";

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            showAlert("Please fill in all fields.", "danger");
            return;
        }

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            console.log(json);

            if (json.authToken) {
                localStorage.setItem("token", json.authToken);
                showAlert("Logged in successfully!", "success");
                navigate("/");
            } else {
                showAlert("Invalid credentials, please try again.", "danger");
            }
        } catch (error) {
            console.error("Error during login:", error);
            showAlert("Login failed. Please check your connection and try again.", "danger");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg my-4">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;