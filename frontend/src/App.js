import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";
import Home from "./pages/Home";
import AgentRegisterMail from "./pages/AgentRegisterMail";
import AgentRegister from "./pages/AgentRegister";
import AddPerson from "./pages/AddPerson";
import EditAgent from "./pages/EditAgent";
import PersonTravel from "./pages/PersonTravel";

function App() {
  return (
    <>
      <Router>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="adminlogin" element={<AdminLogin />} />
            <Route path="admindashboard" element={<AdminDashboard />} />
            <Route path="agentlogin" element={<AgentLogin />} />
            <Route path="agentdashboard" element={<AgentDashboard />} />
            <Route path="agentregistermail" element={<AgentRegisterMail />} />
            <Route path="agentregister" element={<AgentRegister />} />
            <Route path="addperson" element={<AddPerson />} />
            <Route path="editagent/:id" element={<EditAgent />} />
            <Route path="persontravel/:id" element={<PersonTravel />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
