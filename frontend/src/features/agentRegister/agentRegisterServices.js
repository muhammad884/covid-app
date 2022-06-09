import axios from "axios";
const API_URL = "http://localhost:3001/covid/";

// @desc add agent
// @route  POST covid/agent/register
const registerAgent = ({ name, email, password, city }) => {
  // get token
  // const token = localStorage.getItem("admin");
  // const config = {
  //   headers: { authorization: `Bearer ${token}` },
  // };
  return axios
    .post(API_URL + "agent/register", {
      name: name,
      email: email,
      password: password,
      city: city,
    })
    .then((res) => {
      return res.data;
    });
};

const AgentRegisterService = {
  registerAgent,
};
export default AgentRegisterService;
