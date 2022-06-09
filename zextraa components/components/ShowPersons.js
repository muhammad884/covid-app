import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowPersons = ({ personsData, agentInfo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const agentToken = localStorage.getItem("agent");
    if (!agentToken) {
      navigate("/AgentLogin");
      alert("Please Login First");
    }
  }, [navigate]);

  return (
    <div className="container m-5 mx-auto">
      <div className="row">
        <table className="col-12 table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sno</th>
              <th scope="col">Name</th>
              <th scope="col">Cnic</th>
              <th scope="col">Address</th>
              <th scope="col">Dignoised_with_covid</th>
              <th scope="col">Symptoms</th>
              <th scope="col">Recovered</th>
              <th scope="col">Death</th>
            </tr>
          </thead>
          <tbody>
            {personsData.map((person, index) => (
              <tr key={person.cnic}>
                <td>{index + 1}</td>
                <td>
                  {/* <Link to={`/PersonDetails/${person._id}`}>{person.name}</Link> */}
                  {/* {finalData.map((p) => (
                      <div key={index}>{p.fullname}</div>
                    ))} */}
                  {person.first_name} {person.last_name}
                </td>
                <td>{person.cnic}</td>
                <td>
                  {person.perm_address.line_1} {person.perm_address.line_2}{" "}
                  {person.perm_address.city}
                </td>
                <td>{person.diagnosed_with_covid}</td>
                <td>{person.symptoms + ""}</td>
                <td>{person.recovered}</td>
                <td>
                  {person.date_of_death === "" ? "Alive" : person.date_of_death}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowPersons;
