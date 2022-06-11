import axios from "axios";
// const API_URL = "http://localhost:3001/covid/";
const API_URL = "/covid/";
// @desc get all persons of current agent
const getPersons = () => {
  const token = localStorage.getItem("agent");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.get(API_URL + `agent/:persons`, config).then((res) => {
    return res.data;
  });
};

// @desc get person by id
const getPersonById = (id) => {
  const token = localStorage.getItem("agent");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.get(API_URL + `agent/person/${id}`, config).then((res) => {
    return res.data;
  });
};

const personsServices = {
  getPersons,
  getPersonById,
};

export default personsServices;
