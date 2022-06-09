import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/AuthServices";
import Navbar from "./Navbar";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authServices.login(email, password).then(
        () => {
          navigate("/AdminDashboard");
        },
        (error) => {
          setError(error.response.data.msg);
          console.log(error);
        }
      );
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto ">
        <h1 className="text-center display-6 m-5">Admin Login</h1>
        {error ? <p className="text-danger text-center">{error}</p> : null}
        <form onSubmit={handleLogin}>
          <div className="justify-content-sm-center">
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                value={"Login"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
