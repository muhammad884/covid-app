import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAgent } from "../features/agentRegister/agentRegisterSlice";

const AgentRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });
  const { name, email, password, city } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const agentData = {
      name,
      email,
      password,
      city,
    };
    dispatch(registerAgent(agentData));
    alert("Registered Successfully");
    navigate("/agentlogin");
  };
  return (
    <div className="container-fluid">
      <nav className="bg-indigo-800">
        <div className="max-w-7xl mx-auto px-2  sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-17">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center text-white text-2xl font-extrabold py-2">
                <Link to="/">COVIDATA</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <h1 className="mt-16 text-center text-2xl font-extrabold text-gray-900">
        Agent Register
      </h1>
      <div className="container mx-auto m-10 rounded shadow-inner">
        <form onSubmit={handleRegister} className="mx-auto  w-2/3">
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full md:w-1/2 px-5 mb-3 md:mb-0 lg:pb-8">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                id="grid-first-name"
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-5 lg:pb-8">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                id="grid-email"
                type="email"
                placeholder="
                            Enter your email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-5 lg:pt-8">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-5 mb-3 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                id="grid-password"
                type="password"
                placeholder="******************"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-5 lg:pt-8">
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
                placeholder="Enter your city"
                name="city"
                value={city}
                onChange={onChange}
              />
            </div>
            <div
              type="submit"
              className="w-full md:w-1/2 lg:w-2/3 px-3 mx-auto py-16"
            >
              <button className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-3 px-16 rounded focus:outline-none focus:shadow-outline mx-auto block ">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentRegister;
