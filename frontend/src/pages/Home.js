import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../img.svg";
const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.adminAuthSlice);

  const agent = localStorage.getItem("agent");
  return (
    <div className="container-fluid min-w-fit">
      <nav className="bg-indigo-800 w-100">
        <div className="container mx-auto">
          <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center sm:justify-between h-17">
              <div className="text-center sm:text-left py-2">
                <Link to="/" className="text-white text-2xl font-extrabold">
                  COVID DATA
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6 ">
                <div className="flex space-x-4 ">
                  {isAuthenticated ? (
                    <Link
                      to="/admindashboard"
                      className="text-white block px-3 py-3 rounded-md text-base  text-center font-extrabold"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      className="text-white block px-3 py-3 rounded-md text-base  text-center font-extrabold"
                      to="/adminlogin"
                    >
                      Admin Login
                    </Link>
                  )}

                  {agent ? (
                    <Link
                      to="/agentdashboard"
                      className="text-white block px-3 py-3 rounded-md text-base  text-center font-extrabold"
                    >
                      Agent Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/agentlogin"
                      className="text-white block px-3 py-3 rounded-md text-base  text-center font-extrabold"
                    >
                      Agent Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-3 pb-3 space-y-2">
            {isAuthenticated ? (
              <Link
                to="/admindashboard"
                className="bg-indigo-500 text-white block px-3 py-5 rounded-md text-base  text-center  w-96 mx-auto font-extrabold hover:bg-indigo-700"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                className="bg-indigo-500 text-white block px-2 py-5 rounded-md text-base  text-center font-extrabold hover:bg-indigo-700 w-96 mx-auto"
                to="/adminlogin"
              >
                Admin Login
              </Link>
            )}

            {agent ? (
              <Link
                to="/agentdashboard"
                className="bg-indigo-500 text-white block px-3 py-5 rounded-md text-base font-extrabold text-center w-96 mx-auto hover:bg-indigo-700"
              >
                Agent Dashboard
              </Link>
            ) : (
              <Link
                to="/agentlogin"
                className="bg-indigo-500 text-white block px-3 py-5 rounded-md text-base font-extrabold text-center  w-96 mx-auto hover:bg-indigo-700"
              >
                Agent Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 col-start-1">
          <div className="lg:order-last">
            <img className="" src={img} alt="img" />
          </div>
          <div className="">
            <p className="text-green-500 text-2xl">KNOW ABOUT COVID-19</p>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-indigo-600">COVID-19</span>
              <span className="block  xl:inline">Situation</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              The coronavirus, or COVID-19, is inciting panic for a number of
              reasons. It's a new virus, meaning no one has immunity.It is
              highly contagious, meaning it spreads fast. Its novelty means that
              scientists aren't completely sure as to how it behaves since they
              have very little history to go on.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                >
                  {" "}
                  PAKISTAN DETAILS{" "}
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to=""
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  {" "}
                  Live demo{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
