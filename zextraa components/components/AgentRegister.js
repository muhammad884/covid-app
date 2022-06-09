import React from "react";
import authServices from "../services/AuthServices";
import { useNavigate } from "react-router-dom";
const AgentRegister = () => {
  const navigate = useNavigate();
  const [agent, setAgent] = React.useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });
  const [error, setError] = React.useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authServices.registerAgent(agent).then(() => {
        // window.location.reload();
        alert("Agent Registered Successfully");
        navigate("/AgentLogin");
      });
    } catch (err) {
      setError(err.response.data.msg);
      // console.log(err);
    }
  };

  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto ">
      <h1 className="text-center display-6 m-5">Agent Registration</h1>
      {error ? <p className="text-danger text-center">{error}</p> : null}
      <form onSubmit={handleRegister}>
        <div className="justify-content-sm-center">
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="name"
              value={agent.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              name="email"
              value={agent.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={agent.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your City"
              name="city"
              value={agent.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <input
              type="submit"
              className="btn btn-primary w-100 mx-auto"
              value={"Register"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgentRegister;
