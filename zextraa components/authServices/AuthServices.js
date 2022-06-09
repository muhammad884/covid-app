// import axios from "axios";
// const API_URL = "http://localhost:3001/covid/";

// //@desc admin login service and set admin in local storage
// const adminLogin = (email, password) => {
//   return axios
//     .post(API_URL + "admin/login", {
//       email: email,
//       password: password,
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         localStorage.setItem("admin", res.data.token);
//       }
//       console.log(res.data);
//       return res.data;
//     });
// };
// // @desc send mail to agent
// const sendMail = (email) => {
//   // get token
//   const token = localStorage.getItem("admin");
//   const config = {
//     headers: { authorization: `Bearer ${token}` },
//   };
//   return axios
//     .post(API_URL + "admin/sendemail", { email: email }, config)

//     .then((res) => {
//       return res.data;
//     });
// };

// // @desc add agent
// // @route  POST covid/agent/register
// const registerAgent = ({ name, email, password, city }) => {
//   // get token
//   // const token = localStorage.getItem("admin");
//   // const config = {
//   //   headers: { authorization: `Bearer ${token}` },
//   // };
//   return axios
//     .post(API_URL + "agent/register", {
//       name: name,
//       email: email,
//       password: password,
//       city: city,
//     })
//     .then((res) => {
//       return res.data;
//     });
// };

// // @desc agent login service and set agent in local storage
// const agentLogin = (email, password) => {
//   return axios
//     .post(API_URL + "agent/login", {
//       email: email,
//       password: password,
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         localStorage.setItem("agent", res.data.token);
//       }
//       return res.data;
//     });
// };

// // @desc agent logout
// const agentLogout = () => {
//   localStorage.removeItem("agent");
// };

// const logout = () => {
//   localStorage.removeItem("admin");
// };

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("admin"));
// };

// // @desc get current agent
// const getCurrentAgent = () => {
//   const token = localStorage.getItem("agent");
//   return axios
//     .get(API_URL + "agent/dashboard", {
//       headers: { authorization: `Bearer ${token}` },
//     })
//     .then((res) => {
//       return res.data;
//     });
// };

// // @desc get all agents
// const getAgents = () => {
//   const token = localStorage.getItem("admin");
//   const config = {
//     headers: { authorization: `Bearer ${token}` },
//   };
//   return axios.get(API_URL + "admin/showAgents", config).then((res) => {
//     return res.data;
//   });
// };

// // @desc add person
// // @route  POST covid/person/register
// const addPerson = ({
//   agent_uid,
//   first_name,
//   last_name,
//   cnic,
//   perm_address: { line_1, line_2, zip_code, city },
//   symptoms,
//   diagnosed_with_covid,
//   recovered,
//   date_of_death,
// }) => {
//   // get token
//   const token = localStorage.getItem("agent");
//   const config = {
//     headers: { authorization: `Bearer ${token}` },
//   };
//   return axios
//     .post(
//       API_URL + "person/register",
//       {
//         agent_uid: agent_uid,
//         first_name: first_name,
//         last_name: last_name,
//         cnic: cnic,
//         perm_address: {
//           line_1: line_1,
//           line_2: line_2,
//           zip_code: zip_code,
//           city: city,
//         },
//         symptoms: symptoms,
//         diagnosed_with_covid: diagnosed_with_covid,
//         recovered: recovered,
//         date_of_death: date_of_death,
//       },
//       config
//     )
//     .then((res) => {
//       return res.data;
//     });
// };

// // @desc get all persons of current agent
// const getPersons = () => {
//   const token = localStorage.getItem("agent");
//   const config = {
//     headers: { authorization: `Bearer ${token}` },
//   };
//   return axios.get(API_URL + `agent/:persons`, config).then((res) => {
//     return res.data;
//   });
// };

// // @desc get person by id
// const getPerson = (id) => {
//   return axios.get(API_URL + `agent/person/:${id}`).then((res) => {
//     return res.data;
//   });
// };

// const authServices = {
//   // signup,
//   adminLogin,
//   sendMail,
//   registerAgent,
//   agentLogin,
//   agentLogout,
//   logout,
//   getCurrentUser,
//   getCurrentAgent,
//   getAgents,
//   addPerson,
//   getPersons,
//   getPerson,
// };
// export default authServices;
