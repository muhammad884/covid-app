import axios from "axios";
const API_URL = "http://localhost:3001/covid/";

// @desc get all agents
const getAgents = () => {
  const token = localStorage.getItem("admin");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.get(API_URL + "admin/showAgents", config).then((res) => {
    return res.data;
  });
};

// @desc get agent by id
const getAgentById = (id) => {
  const token = localStorage.getItem("admin");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios.get(API_URL + "admin/showAgents/" + id, config).then((res) => {
    return res.data;
  });
};

// @desc update agent
const updateAgent = (data) => {
  const token = localStorage.getItem("admin");
  const config = {
    headers: { authorization: `Bearer ${token}` },
    data: data,
  };

  return axios.put(API_URL + "admin/editagent/" + data, config).then((res) => {
    return res.data;
  });
};

// @desc delete agent
const deleteAgent = (id) => {
  const token = localStorage.getItem("admin");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios
    .delete(API_URL + "admin/deleteagent/" + id, config)
    .then((res) => {
      return res.data;
    });
};

const AgentsService = {
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
};
export default AgentsService;
