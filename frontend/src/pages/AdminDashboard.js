import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../features/auth/adminAuthSlice";
import { getAgents } from "../features/agents/showAgentsSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);

  const { isAuthenticated, token } = useSelector(
    (state) => state.adminAuthSlice
  );
  const { agents } = useSelector((state) => state.showAgentsSlice);
  useEffect(() => {
    if (isAuthenticated === false || localStorage.getItem("admin") === null) {
      navigate("/adminlogin");
    } else {
      dispatch(getAgents());
    }
  }, [navigate, isAuthenticated, token, dispatch]);

  const logOut = () => {
    dispatch(adminLogout());
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
              {}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/agentregistermail"
                    className="hover:bg-indigo-900 text-white px-3 py-2 rounded-md  text-1xl font-extrabold"
                    aria-current="page"
                  >
                    Add Agent by Email
                  </Link>
                </div>
              </div>
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className=" hover:bg-indigo-900 text-white px-3 py-2 rounded-md   text-1xl font-extrabold"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showNavbar && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/agentregistermail"
                className="bg-indigo-800 text-white block px-3 py-2 w-1/2 mx-auto text-center rounded-md text-base font-medium hover:bg-indigo-700"
                aria-current="page"
              >
                Add Agent
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div
        onClick={() => {
          setShowNavbar(false);
          // setProfile(false);
        }}
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <div className="container mx-auto my-10">
          <h1 className="text-center font-extrabold text-2xl py-3">
            Agents List
          </h1>

          <div className="container mx-aut0 drop-shadow-lg relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table-auto w-full mx-auto drop-shadow-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">SNO.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">State</th>
                  {/* <th className="px-4 py-2">Edit</th> */}
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{agent.name}</td>
                    <td className="border px-4 py-2">{agent.email}</td>
                    <td className="border px-4 py-2">{agent.city}</td>
                    <td className="border px-4 py-2">
                      {agent.state ? (
                        <p className="text-green-700  py-3 text-center w-3/6  mx-auto">
                          Activated
                        </p>
                      ) : (
                        <p className="text-red-700  p-3 text-center w-3/6  mx-auto">
                          Not Activated
                        </p>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <Link
                        to={`/editagent/${agent._id}`}
                        state={{ from: agent._id }}
                      >
                        <p
                          className="text-indigo-900  p-3 text-center w-3/6 mx-auto
                          "
                          aria-current="page"
                        >
                          Edit
                        </p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
