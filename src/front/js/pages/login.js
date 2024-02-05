import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.setToken(email, password).then(() => {
      if (store.token) {
        navigate("/");
      } else {
      alert("Invalid credentials");
      }
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
              Submit
            </button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}