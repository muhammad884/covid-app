import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/AuthServices";
import ShowPersons from "./ShowPersons";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [agent, setAgent] = useState({});
  const [persons, setPersons] = useState([]);
  console.log(persons);
  // @desc check if agent is logged in
  useEffect(() => {
    const agentToken = localStorage.getItem("agent");
    if (!agentToken) {
      navigate("/AgentLogin");
      alert("Please Login First");
    } else {
      authServices.getCurrentAgent().then((res) => {
        setAgent(res.agent);
      });
      authServices.getPersons().then((res) => {
        setPersons(res);
      });
    }
  }, [navigate]);

  const logOut = () => {
    authServices.agentLogout();
    navigate("/AgentLogin");
    // window.location.reload();
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-dark bg-dark w-100 mx-auto">
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
              AGENT DASHBOARD
            </Link>
          </div>
          <div>
            <ul className="nav">
              <li className="nav-item ">
                <Link className="nav-link text-light " to="/AddPerson">
                  ADD PERSON
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="text-light nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={`#`}
                >
                  {agent.name}
                </Link>
                <ul
                  className="bg-dark dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  {/* <li className="text-light">{agent.email}</li> */}
                  <li>
                    <a
                      className="nav-link text-light bg-dark"
                      onClick={logOut}
                      href="/AgentLogin"
                    >
                      LOG OUT
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <h1 className="text-center text-uppercase fs-3 text mt-5">
          PERSONS LIST
        </h1>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <ShowPersons personsData={persons} agentInfo={agent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
