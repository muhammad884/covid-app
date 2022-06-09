import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { sendMail } from "../features/agentmail/mailSlice";

const AgentRegisterMail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated, token, message } = useSelector(
    (state) => state.adminAuthSlice
  );
  useEffect(() => {
    if (!isAuthenticated && token == null) {
      navigate("/");
    } else {
      setError(message);
    }
  }, [isAuthenticated, navigate, token, message]);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    dispatch(sendMail(email));
    alert("Mail sent successfully");
    setEmail("");
  };

  return (
    <div className="container-fluid">
      <nav className="bg-indigo-800">
        <div className="container max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between py-1 h-17">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setShowNavbar(!showNavbar)}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center text-white text-2xl font-extrabold">
                <Link to="/">COVIDATA</Link>
              </div>
            </div>
            <div className=" absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/admindashboard"
                    className="hover:bg-indigo-900 text-white px-3 py-2 rounded-md  text-1xl font-extrabold"
                    aria-current="page"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block sm:ml-6  relative  text-left"></div>
            </div>
          </div>
        </div>

        {showNavbar && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/admindashboard"
                className="bg-indigo-800 text-white block px-3 py-2 w-1/2 mx-auto text-center rounded-md text-base font-medium hover:bg-indigo-700"
                aria-current="page"
              >
                Back to Dashboard
              </Link>
            </div>
            <div className="relative text-left"></div>
          </div>
        )}
      </nav>
      <h1 className="mt-16 text-center text-2xl font-extrabold text-gray-900">
        Agent Register Mail
      </h1>
      <div className="container mx-auto px-10 my-24 content-center align-center ">
        {/* send registration mail  */}
        <form
          className="mt-8 space-y-6 sm:w-96 md:w-72 lg:w-1/3 mx-auto border-shadow"
          onSubmit={handleSendMail}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px border-shadow">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Mail
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 text-center">
            <LockClosedIcon className="text-red-500 h-5 w-5 mr-2" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentRegisterMail;
