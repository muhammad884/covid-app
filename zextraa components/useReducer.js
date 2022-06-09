import * as React from "react";
import { render } from "react-dom";
import produce from "immer";
import { set, has } from "lodash";

import "./styles.css";

function enhancedReducer(state, updateArg) {
  // check if the type of update argument is a callback function
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }

  // if the type of update argument is an object
  if (updateArg.constructor === Object) {
    // does the update object have _path and _value as it's keys
    // if yes then use them to update deep object values
    if (has(updateArg, "_path") && has(updateArg, "_value")) {
      const { _path, _value } = updateArg;

      return produce(state, (draft) => {
        set(draft, _path, _value);
      });
    } else {
      return { ...state, ...updateArg };
    }
  }
}

const initialState = {
  firstName: "",
  lastName: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
  },
  isMember: false,
};

function App() {
  const [state, updateState] = React.useReducer(enhancedReducer, initialState);

  const updateForm = React.useCallback(({ target: { value, name, type } }) => {
    const updatePath = name.split(".");

    // if the input is a checkbox then use callback function to update
    // the toggle state based on previous state
    if (type === "checkbox") {
      updateState((prevState) => ({
        [name]: !prevState[name],
      }));

      return;
    }

    // if we have to update the root level nodes in the form
    if (updatePath.length === 1) {
      const [key] = updatePath;

      updateState({
        [key]: value,
      });
    }

    // if we have to update nested nodes in the form object
    // use _path and _value to update them.
    if (updatePath.length === 2) {
      updateState({
        _path: updatePath,
        _value: value,
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Hello, i'm your supposedly complex form.</h1>
      <input
        className="input"
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={updateForm}
        value={state.firstName}
      />
      <br />
      <input
        className="input"
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={updateForm}
        value={state.lastName}
      />
      <br />
      <input
        className="input"
        type="text"
        name="address.addressLine1"
        placeholder="Address Line One"
        onChange={updateForm}
        value={state.address.addressLine1}
      />
      <br />
      <input
        className="input"
        type="text"
        name="address.addressLine2"
        placeholder="Address Line Two"
        onChange={updateForm}
        value={state.address.addressLine2}
      />
      <br />
      <input
        className="input"
        type="text"
        name="address.pinCode"
        placeholder="Pincode"
        onChange={updateForm}
        value={state.address.pinCode}
      />
      <br />
      <label className="container">
        Are you a member already?
        <input
          type="checkbox"
          name="isMember"
          onChange={updateForm}
          checked={state.isMember}
        />
        <span className="checkmark" />
      </label>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
