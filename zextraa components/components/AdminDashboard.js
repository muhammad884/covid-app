import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authServices from "../services/AuthServices";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [agents, setAgents] = useState([]);
  // @desc check if admin is logged in
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/AdminLogin");
      alert("Please Login First");
    } else {
      setAdmin(admin);
      getAllAgents();
    }
  }, [agents, navigate]);
  const logOut = () => {
    authServices.logout();
    navigate("/AdminLogin");
    // window.location.reload();
  };
  // @desc get all agents
  const getAllAgents = async () => {
    try {
      const res = await authServices.getAgents();
      setAgents(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-dark bg-dark w-100">
        <div className="container d-flex justify-content-between ">
          <div>
            <Link className="navbar-brand b" to="/">
              COVIDATA
            </Link>
          </div>
          <div className=" w-25 text-end">
            <Link
              className="navbar-brand mx-auto text-center "
              to="/AdminDashboard"
            >
              ADMIN DASHBOARD
            </Link>
          </div>
          <div>
            <ul className="nav">
              <li className="nav-item ">
                <Link className="nav-link text-light " to="/SendMailToAgent">
                  ADD AGENT
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light "
                  onClick={logOut}
                  href="/AdminLogin"
                >
                  LOG OUT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <h1 className="text-center text-uppercase fs-3 text mt-5">
          ALL AGENTS
        </h1>
        <div className="justify-content-sm-center m-5">
          <table className="table table-striped  table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.city}</td>
                  {/* <td>
                    <Link
                      className="btn btn-primary"
                      to={`/SendMailToAgent/${agent._id}`}
                    >
                      Send Mail
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
