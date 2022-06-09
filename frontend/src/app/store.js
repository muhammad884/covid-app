import { configureStore } from "@reduxjs/toolkit";
import adminAuthSlice from "../features/auth/adminAuthSlice";
import agentAuthSlice from "../features/auth/agentAuthSlice";
import showAgentsSlice from "../features/agents/showAgentsSlice";
import sendEmailSlice from "../features/agentmail/mailSlice";
import agentRegisterSlice from "../features/agentRegister/agentRegisterSlice";
import currentAgentSlice from "../features/currentAgent/currentAgentSlice";
import showPersonsSlice from "../features/showPersons/showPersonsSlice";
import addPersonSlice from "../features/addPerson/addPersonSlice";
import showAgentByIdSlice from "../features/agents/showAgentByIdSlice";
import updateAgentSlice from "../features/agents/updateAgentSlice";
import deleteAgentSlice from "../features/agents/deleteAgentSlice";
import showPersonByIdSlice from "../features/showPersons/showPersonByIdSlice";
import addTravelSlice from "../features/travelRegister/travelRegisterSlice";
import getTravelSlice from "../features/travelRegister/getTravelSlice";

const store = configureStore({
  reducer: {
    adminAuthSlice: adminAuthSlice,
    agentAuthSlice: agentAuthSlice,
    showAgentsSlice: showAgentsSlice,
    sendEmailSlice: sendEmailSlice,
    agentRegisterSlice: agentRegisterSlice,
    currentAgentSlice: currentAgentSlice,
    showPersonsSlice: showPersonsSlice,
    addPersonSlice: addPersonSlice,
    showAgentByIdSlice: showAgentByIdSlice,
    updateAgentSlice: updateAgentSlice,
    deleteAgentSlice: deleteAgentSlice,
    showPersonByIdSlice: showPersonByIdSlice,
    addTravelSlice: addTravelSlice,
    getTravelSlice: getTravelSlice,
  },
});

export default store;
