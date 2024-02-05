import React, { useContext, useState } from 'react';

import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createUser(email, password).then(() => {
            actions.setToken(email, password).then(() => {
                if (store.token) {
                    navigate("/");
                } else {
                    setError("Invalid credentials");
                }
            });

        });
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-12 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <Link to="/login" className="btn btn-link">
                            Login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}