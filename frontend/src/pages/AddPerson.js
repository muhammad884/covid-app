import React, { useState, useEffect, useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import produce from "immer";
import { set, has } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { agentLogout } from "../features/auth/agentAuthSlice";
import { addPerson } from "../features/addPerson/addPersonSlice";
import { getCurrentAgent } from "../features/currentAgent/currentAgentSlice";

const enhancedReducer = (state, updateArg) => {
  // check if the type of update argument is a callback function
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }

  // if the type of update argument is an object
  if (updateArg.constructor === Object) {
    // does the update object have _path and _value as it's keys
    // if yes then use them to update deep object values
    if (has(updateArg, "_path") && has(updateArg, "_value")) {
      const { _path, _value } = updateArg;

      return produce(state, (draft) => {
        set(draft, _path, _value);
      });
    } else {
      return { ...state, ...updateArg };
    }
  }

  // if the type of update argument is an array then push values to the array
  if (updateArg.constructor === Array) {
    return produce(state, (draft) => {
      draft.push(updateArg);
    });
  }
};

const AddPerson = () => {
  const dispatchh = useDispatch();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  const [profile, setProfile] = useState(false);
  const [err, setErr] = useState("");
  // const [msg, setMsg] = useState("");
  // const [agentt, setAgentt] = useState("");
  const { agent } = useSelector((state) => state.currentAgentSlice);
  const { isAgentAuthenticated } = useSelector((state) => state.agentAuthSlice);
  const { error, message } = useSelector((state) => state.addPersonSlice);
  // @desc useReducer to handle form state
  const initialState = {
    first_name: "",
    last_name: "",
    cnic: "",
    perm_address: {
      line_1: "",
      line_2: "",
      zip_code: "",
      city: "",
    },
    symptoms: [],
    diagnosed_with_covid: "",
    recovered: "",
    date_of_death: "",
  };

  const [state, updateState] = useReducer(enhancedReducer, initialState);

  const updateForm = React.useCallback(
    ({ target: { value, name, id, key } }) => {
      const updatePath = name.split(".");
      // if we have to update the root level nodes in the form
      if (updatePath.length === 1) {
        const [key] = updatePath;
        updateState({
          [key]: value,
        });
      }

      // if we have to update nested nodes in the form object
      // use _path and _value to update them.
      if (updatePath.length === 2) {
        updateState({
          _path: updatePath,
          _value: value,
        });
      }

      // if we have to update the array in the form object
      if (updatePath.length === 1 && name === "symptom_1") {
        updateState((prevState) => {
          const { symptoms } = prevState;
          const newSymptoms = [...symptoms];
          newSymptoms[id] = value;
          return { symptoms: newSymptoms };
        });
      }
      if (updatePath.length === 1 && name === "symptom_2") {
        updateState((prevState) => {
          const { symptoms } = prevState;
          const newSymptoms = [...symptoms];
          newSymptoms[id] = value;
          return { symptoms: newSymptoms };
        });
      }
      if (updatePath.length === 1 && name === "symptom_3") {
        updateState((prevState) => {
          const { symptoms } = prevState;
          const newSymptoms = [...symptoms];
          newSymptoms[id] = value;
          return { symptoms: newSymptoms };
        });
      }
    },
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchh(addPerson(state));
    updateState(initialState);
  };

  useEffect(() => {
    if (!isAgentAuthenticated) {
      dispatchh(agentLogout());
      navigate("/agentlogin");
    } else {
      dispatchh(getCurrentAgent());
      setErr(err);
    }
  }, [err]);

  const logOut = () => {
    dispatchh(agentLogout());
    navigate("/agentlogin");
  };
  console.log(state);

  return (
    <div className="container-fluid">
      <div className="bg-indigo-800">
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
                    <div className="py-1" role="none">
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
      </div>
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-s">
            <h1 className="my-8 text-center text-2xl font-extrabold text-gray-900">
              Person Registration
            </h1>
            {message && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-5 w-1/2">
                <p className="font-bold">{message}</p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 w-1/2">
                <p className="font-bold">{error}</p>
              </div>
            )}
            <div className="flex flex-col break-word border-2 rounded shadow-md w-full">
              <form className="w-full p-12" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-first-name"
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={state.first_name}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-last-name"
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={state.last_name}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-cnic"
                    >
                      CNIC
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-cnic"
                      type="text"
                      placeholder="1234567890123"
                      name="cnic"
                      value={state.cnic}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Zip Code
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-zip"
                      type="number"
                      placeholder="12345"
                      name="perm_address.zip_code"
                      value={state.zip_code}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-line-1"
                    >
                      Line 1
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-line-1"
                      type="text"
                      placeholder="123 Main St"
                      name="perm_address.line_1"
                      value={state.line_1}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-line-2"
                    >
                      Line 2
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-line-2"
                      type="text"
                      placeholder="village , town , district"
                      name="perm_address.line_2"
                      value={state.line_2}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="grid-city"
                      type="text"
                      placeholder="City"
                      name="perm_address.city"
                      value={state.perm_address.city}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="0"
                    >
                      symptom_1
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="0"
                      type="text"
                      placeholder="symptom_1"
                      name={`symptom_1`}
                      value={state.symptoms[0]}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="1"
                    >
                      symptom_2
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="1"
                      type="text"
                      placeholder="symptom_2"
                      name={`symptom_2`}
                      value={state.symptoms[1]}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="2"
                    >
                      symptom_3
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="2"
                      key={2}
                      type="text"
                      placeholder="symptom_3"
                      name={`symptom_3`}
                      value={state.symptoms[2]}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="diagnosed_date"
                    >
                      Diagnosed Date
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="diagnosed_date"
                      type="date"
                      placeholder="diagnosed_with_covid"
                      name="diagnosed_with_covid"
                      value={state.diagnosed_with_covid}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="recovered_date"
                    >
                      Recovered Date
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="recovered_date"
                      type="date"
                      placeholder="recovered_date"
                      name="recovered"
                      value={state.recovered}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="Date_of_death"
                    >
                      Date of Death
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                      id="Date_of_death"
                      type="date"
                      placeholder="Date_of_death"
                      name="date_of_death"
                      value={state.date_of_death}
                      onChange={updateForm}
                    />
                  </div>

                  <div
                    type="submit"
                    className="w-full md:w-1/2 lg:w-2/3 px-3 mx-auto pt-10 pb-0"
                  >
                    <button className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-3 px-16 rounded focus:outline-none focus:shadow-outline mx-auto block ">
                      Add Person
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;
