import axios from "axios";
// const API_URL = "http://localhost:3001/covid/";
const API_URL = "/covid/";

// @desc add person
// @route  POST covid/person/register
const addPerson = ({
  agent_uid,
  first_name,
  last_name,
  cnic,
  perm_address: { line_1, line_2, zip_code, city },
  symptoms,
  diagnosed_with_covid,
  recovered,
  date_of_death,
}) => {
  // get token
  const token = localStorage.getItem("agent");
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  return axios
    .post(
      API_URL + "person/register",
      {
        agent_uid: agent_uid,
        first_name: first_name,
        last_name: last_name,
        cnic: cnic,
        perm_address: {
          line_1: line_1,
          line_2: line_2,
          zip_code: zip_code,
          city: city,
        },
        symptoms: symptoms,
        diagnosed_with_covid: diagnosed_with_covid,
        recovered: recovered,
        date_of_death: date_of_death,
      },
      config
    )
    .then((res) => {
      return res.data;
    });
};

const addPeresonServices = {
  addPerson,
};
export default addPeresonServices;
