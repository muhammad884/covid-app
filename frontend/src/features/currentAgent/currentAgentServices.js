import axios from "axios";
// const API_URL = "http://localhost:3001/covid/";
const API_URL = "/covid/";
// @desc get current agent
const getCurrentAgent = () => {
  const token = localStorage.getItem("agent");
  return axios
    .get(API_URL + "agent/dashboard", {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
};

const CurrentAgentServices = {
  getCurrentAgent,
};
export default CurrentAgentServices;
