import React from "react";
import authServices from "../services/AuthServices";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AddPerson = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    cnic: "",
    perm_address: {
      line_1: "",
      line_2: "",
      zip_code: "",
      city: "",
    },
    symptoms: [],
    diagnosed_with_covid: "",
    recovered: "",
    date_of_death: "",
  });
  const [error, setError] = React.useState("");

  console.log(person);

  // @desc check agent is logged in
  useEffect(() => {
    const agentToken = localStorage.getItem("agent");
    if (!agentToken) {
      navigate("/AgentLogin");
      alert("Please Login First");
    }
  }, [navigate]);

  // const handleChange = (e) => {
  //   setPerson({ ...person, [e.target.name]: e.target.value });
  // };

  const handleRegister = (e) => {
    e.preventDefault();
    authServices
      .addPerson(person)
      .then((res) => {
        // alert("Person Registered Successfully");
        console.log(res);
        alert("Person Registered Successfully");
        // @desc clear form
        setPerson({
          first_name: "",
          last_name: "",
          cnic: "",
          perm_address: {
            line_1: "",
            line_2: "",
            zip_code: "",
            city: "",
          },
          symptoms: [],
          diagnosed_with_covid: "",
          recovered: "",
          date_of_death: "",
        });
        // @desc set error to empty
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid m-0 p-0">
      <nav className="navbar navbar-dark bg-dark w-100">
        <div className="container d.flex d-flex justify-content-between ">
          <div>
            <Link className="navbar-brand " to="/">
              COVIDATA
            </Link>
          </div>
          <div>
            <Link
              className="navbar-brand mx-auto text-center"
              to="/AgentDashboard"
            >
              BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto ">
        <h1 className="text-center display-6 m-5">Person Registration</h1>
        {error ? <p className="text-danger text-center">{error}</p> : null}
        <form onSubmit={handleRegister}>
          <div className="row mx-auto">
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="first_name"
                value={person.first_name}
                onChange={(e) =>
                  setPerson({ ...person, first_name: e.target.value })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="last_name"
                value={person.last_name}
                onChange={(e) =>
                  setPerson({ ...person, last_name: e.target.value })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="CNIC"
                name="cnic"
                value={person.cnic}
                onChange={(e) => setPerson({ ...person, cnic: e.target.value })}
              />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="village"
                name="line_1"
                value={person.perm_address.line_1}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    perm_address: {
                      ...person.perm_address,
                      line_1: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={person.perm_address.city}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    perm_address: {
                      ...person.perm_address,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="District"
                name="line_2"
                value={person.perm_address.line_2}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    perm_address: {
                      ...person.perm_address,
                      line_2: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="Zip Code"
                name="zip_code"
                value={person.perm_address.zip_code}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    perm_address: {
                      ...person.perm_address,
                      zip_code: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="symptom one"
                name="symptom_one"
                value={person.symptoms[0]}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    symptoms: [e.target.value, person.symptoms[1]],
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="symptom two"
                name="symptom_two"
                value={person.symptoms[1]}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    symptoms: [person.symptoms[0], e.target.value],
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="symptom three"
                name="symptom_three"
                value={person.symptoms[2]}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    symptoms: [
                      person.symptoms[0],
                      person.symptoms[1],
                      e.target.value,
                    ],
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <small
                className="input-group-text bg-light border-end-0"
                id="basic-addon1"
              >
                Dignoised with Covid
              </small>
              <input
                type="date"
                className="form-control border-start-0"
                placeholder="Dignoised with Covid"
                name="dignoised_with_covid"
                value={person.diagnosed_with_covid}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    diagnosed_with_covid: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <small
                className="input-group-text bg-light border-end-0"
                id="basic-addon1"
              >
                Recovered Date
              </small>
              <input
                type="date"
                className="form-control border-start-0"
                placeholder="Recovered Date"
                name="recovered_date"
                value={person.recovered}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    recovered: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 p-3 d-flex justify-content-start">
              <small
                className="input-group-text bg-light border-end-0"
                id="basic-addon1"
              >
                Death Date
              </small>
              <input
                type="date"
                className="form-control border-start-0"
                placeholder="Death Date"
                name="death_date"
                value={person.date_of_death}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    date_of_death: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10 p-3 m-5 mx-auto d-flex justify-content-center">
            <input
              type="submit"
              className="btn btn-primary w-100 mx-auto"
              value={"Add Person"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPerson;
