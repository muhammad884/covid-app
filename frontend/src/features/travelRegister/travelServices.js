import axios from "axios";
const API_URL = "http://localhost:3001/covid/";

// @desc addtravel
// @route  POST covid/travel/register
const addTravel = ({
  person_uid,
  traveling_from_city,
  traveling_to_city,
  traveling_from_date,
  traveling_to_date,
}) => {
  // get token
  const token = localStorage.getItem("agent");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios
    .post(
      API_URL + "person/travel/:person_uid",
      {
        person_uid: person_uid,
        traveling_from_city: traveling_from_city,
        traveling_to_city: traveling_to_city,
        traveling_from_date: traveling_from_date,
        traveling_to_date: traveling_to_date,
      },
      config
    )
    .then((res) => {
      return res.data;
    });
};

// @desc get person travels
// @route  GET covid/travel/person/:person_uid
const getPersonTravels = (id) => {
  // get token
  const token = localStorage.getItem("agent");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const person_uid = id;
  return axios
    .get(API_URL + `person/travel/${person_uid}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const travelServices = {
  addTravel,
  getPersonTravels,
};
export default travelServices;
