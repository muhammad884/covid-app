import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAgentById } from "../features/agents/showAgentByIdSlice";
import { updateAgent } from "../features/agents/updateAgentSlice";
import { deleteAgent } from "../features/agents/deleteAgentSlice";

const EditAgent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);
  const [id] = useState(location.pathname.split("/")[2]);

  const { isAuthenticated, token } = useSelector(
    (state) => state.adminAuthSlice
  );
  const { from } = location.state || { from: { pathname: "/" } };
  const agent = useSelector((state) => state.showAgentByIdSlice);
  const { message, isError } = useSelector((state) => state.updateAgentSlice);

  useEffect(() => {
    if (isAuthenticated === false || localStorage.getItem("admin") === null) {
      navigate("/adminlogin");
    } else {
      dispatch(getAgentById(from));
    }
  }, [
    dispatch,
    navigate,
    isAuthenticated,
    token,
    from,
    id,
    message,
    agent.state,
  ]);
  // console.log(agent.agent);
  // console.log(id);
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
      <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
        <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-black focus:outline-none focus:text-balck focus:bg-gray-700">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
      <div className="container mx-auto my-10">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-10 sm:px-6">
            <h3 className=" leading-6  text-gray-900 font-extrabold text-2xl">
              Agent Information
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {agent.agent.name}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {agent.agent.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Agent Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {agent.agent.state ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </dd>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 py-5">
                  {agent.agent.state ? (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        dispatch(
                          updateAgent({
                            agent: { id, state: false },
                          })
                        );
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        dispatch(
                          updateAgent({
                            agent: { id, state: true },
                          })
                        );
                      }}
                    >
                      Activate
                    </button>
                  )}
                  {!isError && (
                    <div className="text-green-500 text-sm mt-2">{message}</div>
                  )}
                </dd>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 py-5 mx-auto">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded 
                   "
                    onClick={() => {
                      dispatch(deleteAgent(id));
                      alert("Agent Deleted");
                      navigate("/admindashboard");
                    }}
                  >
                    Delete
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;
