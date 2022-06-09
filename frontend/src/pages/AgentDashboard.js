import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentAgent } from "../features/currentAgent/currentAgentSlice";
import { agentLogout } from "../features/auth/agentAuthSlice";
import { getPersons } from "../features/showPersons/showPersonsSlice";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);
  const [profile, setProfile] = useState(false);

  const { isAuthenticated, token } = useSelector(
    (state) => state.agentAuthSlice
  );
  const { agent } = useSelector((state) => state.currentAgentSlice);
  const { persons } = useSelector((state) => state.showPersonsSlice);
  useEffect(() => {
    if (isAuthenticated === false || localStorage.getItem("agent") === null) {
      navigate("/agentlogin");
    } else {
      dispatch(getCurrentAgent());
      dispatch(getPersons());
    }
  }, [navigate, isAuthenticated, token, dispatch]);

  const logOut = () => {
    dispatch(agentLogout());
    navigate("/agentlogin");
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
                    to="/AddPerson"
                    className="hover:bg-indigo-900 text-white px-3 py-2 rounded-md  text-1xl font-extrabold"
                    aria-current="page"
                  >
                    Add Person
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block sm:ml-6  relative  text-left">
                <div>
                  <button
                    type="button"
                    className="bg-indigo-800 text-white px-3 py-2  text-1xl font-extrabold inline-flex justify-center w-full rounded-mdshadow-sm  hover:bg-indigo-900 rounded"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setProfile(!profile)}
                  >
                    {agent.name}
                    <svg
                      className="-mr-1 ml-2 h-5 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {profile && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-indigo-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        className=" block w-full  px-4 py-2 text-white hover:bg-indigo-900  rounded-md   text-1xl font-extrabold  text-center"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-3"
                        onClick={logOut}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showNavbar && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/AddPerson"
                className="bg-indigo-800 text-white block px-3 py-2 w-1/2 mx-auto text-center rounded-md text-base font-medium hover:bg-indigo-700"
                aria-current="page"
              >
                Add Person
              </Link>
            </div>
            <div className="relative text-left">
              <div className="w-1/2 mx-auto">
                <button
                  type="button"
                  className="bg-indigo-800 text-white px-3 py-2  text-1xl font-extrabold inline-flex justify-center rounded-mdshadow-sm  hover:bg-indigo-900 rounded mx-auto mb-3"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setProfile(!profile)}
                >
                  {agent.name}
                  <svg
                    className="-mr-1 ml-2 h-5 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {profile && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-indigo-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1 " role="none">
                    <button
                      // type="submit"
                      className=" block w-full  px-4 py-2 text-white hover:bg-indigo-900  rounded-md   text-1xl font-extrabold  text-center"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={logOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <div
        onClick={() => {
          setShowNavbar(false);
          setProfile(false);
        }}
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
        // className="flex-1 flex flex-col overflow-y-auto"
      >
        <div className="container mx-auto my-10">
          <h1 className="text-center font-extrabold text-2xl py-3">
            Persons List
          </h1>

          <div className="container mx-aut0 drop-shadow-lg relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table-auto  mx-auto drop-shadow-lg w-full ">
              <thead>
                <tr>
                  <th className="px-4 py-2">SNO.</th>
                  <th className="px-4 py-2">NAME</th>
                  <th className="px-4 py-2">CNIC</th>
                  <th className="px-4 py-2">ADDRESS</th>
                  <th className="px-4 py-2">SYMPTOMS</th>
                  <th className="px-4 py-2">RECOVERED</th>
                  <th className="px-4 py-2">DEATH</th>
                  <th className="px-4 py-2">TRAVEL_HISTORY</th>
                </tr>
              </thead>
              <tbody>
                {persons.length === 0 ? (
                  <tr>
                    <td className="text-center py-10 text-red-600">
                      No Data To Show
                    </td>
                  </tr>
                ) : (
                  persons.map((person, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {person.first_name + " " + person.last_name}
                      </td>
                      <td className="border px-4 py-2">{person.cnic}</td>
                      <td className="border px-4 py-2">
                        {person.perm_address.line_1 +
                          " " +
                          person.perm_address.line_2 +
                          " " +
                          person.perm_address.city}
                      </td>
                      <td className="border px-4 py-2">
                        {person.symptoms + ""}
                      </td>
                      <td className="border px-4 py-2">{person.recovered}</td>
                      <td className="border px-4 py-2">
                        {person.date_of_death ? person.date_of_death : "Alive"}
                      </td>
                      <td className="border px-4 py-2">
                        <Link
                          to={`/persontravel/${person._id}`}
                          state={{
                            // from: person._id,
                            addr: person.perm_address.city,
                          }}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
