import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPersonById } from "../features/showPersons/showPersonByIdSlice";
import { addTravel } from "../features/travelRegister/travelRegisterSlice";
import { getTravel } from "../features/travelRegister/getTravelSlice";

const PersonTravelHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);
  const [travelForm, setTravelForm] = useState(false);
  const [id] = useState(location.pathname.split("/")[2]);
  const { person } = useSelector((state) => state.showPersonByIdSlice);
  const { isAgentAuthenticated } = useSelector((state) => state.agentAuthSlice);
  const { message, error } = useSelector((state) => state.addTravelSlice);
  const { travel } = useSelector((state) => state.getTravelSlice);

  const [fromData, setFormData] = useState({
    person_uid: "",
    traveling_from_city: "",
    traveling_from_date: "",
    traveling_to_city: "",
    traveling_to_date: "",
  });
  const {
    traveling_from_city,
    traveling_from_date,
    traveling_to_city,
    traveling_to_date,
  } = fromData;

  useEffect(() => {
    if (!isAgentAuthenticated) {
      navigate("/agentlogin");
    } else {
      dispatch(getPersonById(id));
      dispatch(getTravel(id));
    }
  }, [isAgentAuthenticated, id, dispatch, navigate]);

  const handleOnchange = (e) => {
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const travelData = {
      person_uid: id,
      traveling_from_city,
      traveling_from_date,
      traveling_to_city,
      traveling_to_date,
    };
    dispatch(addTravel(travelData));
    // clear form
    setFormData({
      person_uid: "",
      traveling_from_city: "",
      traveling_from_date: "",
      traveling_to_city: "",
      traveling_to_date: "",
    });
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
                    to="/agentdashboard"
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
                to="/agentdashboard"
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

      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl leading-7 text-gray-900 font-extrabold text-center py-10">
                Travel History
              </h1>
            </div>
            <div className="container mx-auto">
              <table className="w-full mx-auto">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Cnic
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Alive
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {person.first_name + " " + person.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {person.cnic}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {person.date_of_death === "alive" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Alive
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Dead
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex-shrink-0 py-5">
              <span className="inline-flex rounded-md shadow-sm">
                {person.date_of_death === "alive" ? (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    onClick={() => setTravelForm(!travelForm)}
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Add Travel History</span>
                  </button>
                ) : (
                  <h2
                    className="
                  "
                  >
                    Person is dead
                  </h2>
                )}
              </span>
            </div>
            {travelForm && (
              <div className="container mx-auto transition-opacity">
                <form className="w-full max-w-fit mx-auto py-5">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="traveling_from"
                      >
                        Traveling From
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="traveling_from"
                        type="text"
                        placeholder="Enter traveling from"
                        name="traveling_from_city"
                        value={traveling_from_city}
                        onChange={handleOnchange}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="traveling_to"
                      >
                        Traveling To
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="traveling_to"
                        type="text"
                        placeholder="Enter traveling to"
                        name="traveling_to_city"
                        value={traveling_to_city}
                        onChange={handleOnchange}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="travel_date"
                      >
                        Travel From Date
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="travel_date"
                        type="datetime-local"
                        placeholder="Enter travel start date"
                        name="traveling_from_date"
                        value={traveling_from_date}
                        onChange={handleOnchange}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="travel_date"
                      >
                        Travel To Date
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="travel_date"
                        type="datetime-local"
                        placeholder="Enter travel end date"
                        name="traveling_to_date"
                        value={traveling_to_date}
                        onChange={handleOnchange}
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="text-red-500 text-lg italic ">{error}</div>
                  )}
                  {message && (
                    <div className="text-green-500 text-lg italic ">
                      {message}
                    </div>
                  )}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 py-10 mx-auto flex ">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline
                      mx-auto transition duration-500 ease-in-out transform hover:scale-105"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="container mx-auto transition-opacity">
              <table className="table-auto w-full my-10 drop-shadow-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Travel From</th>
                    <th className="px-4 py-2">Travel To</th>
                    <th className="px-4 py-2">Travel From Date</th>
                    <th className="px-4 py-2">Travel To Date</th>
                  </tr>
                </thead>
                <tbody>
                  {travel.length > 0 ? (
                    travel.map((item) => (
                      <tr key={item._id}>
                        <td className="border px-4 py-2 text-center">
                          {item.traveling_from_city}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {item.traveling_to_city}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {item.traveling_from_date}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {item.traveling_to_date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center text-red-500 font-extrabold">
                        No Travel History
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonTravelHistory;
