import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h1 className="text-center mb-5 text-dark display-5">
          COVIDATA LOGIN PAGE
        </h1>
        <div className="justify-content-sm-center">
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <Link
              className="btn btn-outline-danger w-100 mx-auto text-center p-3 mx-auto"
              to="/Adminlogin"
            >
              ADMIN LOGIN
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
            <Link
              className="btn btn-outline-warning w-100 mx-auto text-center p-3 mx-auto"
              to="/Agentlogin"
            >
              AGENT LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
