import axios from "axios";
const API_URL = "http://localhost:3001/covid/";

// @desc send mail to agent
const sendMail = (email) => {
  // get token
  const token = localStorage.getItem("admin");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios
    .post(API_URL + "admin/sendemail", { email: email }, config)

    .then((res) => {
      return res.data;
    });
};

const AgentMailService = {
  sendMail,
};
export default AgentMailService;
