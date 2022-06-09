import axios from "axios";
const API_URL = "http://localhost:3001/covid/";

//@desc admin login service and set admin in local storage
const adminLogin = (email, password) => {
  return axios
    .post(API_URL + "admin/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("admin", res.data.token);
      }
      return res.data;
    });
};

// @desc admin logout
const adminLogout = () => {
  localStorage.removeItem("admin");
};

// @desc agent login service and set agent in local storage
const agentLogin = (email, password) => {
  return axios
    .post(API_URL + "agent/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("agent", res.data.token);
      }
      return res.data;
    });
};

// @desc agent logout
const agentLogout = () => {
  localStorage.removeItem("agent");
};

const AuthServices = {
  adminLogin,
  adminLogout,
  agentLogin,
  agentLogout,
};

export default AuthServices;
