import React from "react";
import authServices from "../services/AuthServices";
import { Link, useNavigate } from "react-router-dom";

const SendMailToAgent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  // @desc check if admin is logged in
  React.useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/AdminLogin");
      alert("Please Login First");
    }
  }, [navigate]);
  const handleSendMail = async (e) => {
    e.preventDefault();
    try {
      //@desc validate input field
      if (email === "") {
        setError("Please enter email");
        return;
      }
      await authServices.sendMail(email);
      alert("Mail Sent");
      setEmail("");
      // clear input field
      setError("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid p-0">
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
              to="/AdminDashboard"
            >
              BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-5 m-5">
        <h3 className="text-center text-uppercase fs-5 text">
          ADD AGENT BY SENDING MAIL
        </h3>
        {error ? <p className="text-danger text-center">{error}</p> : null}
        <div className="justify-content-sm-center m-5">
          <form onSubmit={handleSendMail}>
            <div className="col-lg-7 col-md-6 col-sm-10 p-4 mx-auto d-flex justify-content-center">
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control w-100 mx-auto text-center  p-3 mx-auto border-0 border-bottom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-10 p-3 mx-auto d-flex justify-content-center">
              <input
                className="btn btn-outline-primary w-100 mx-auto text-center p-2 mx-auto"
                value="SEND EMAIL"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMailToAgent;
