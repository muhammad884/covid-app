import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark w-100 ">
        <div className="container m-1 d.flex mx-auto">
          <div>
            <Link className="navbar-brand " to="/">
              COVIDATA
            </Link>
          </div>
          <div>
            <Link className="navbar-brand display-6" to="/AdminDashboard">
              Admin Dashboard
            </Link>

            <Link className="navbar-brand display-6" to="/AgentDashboard">
              Agent Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
