import React, { useState } from "react";

const AuthHooks = () => {
  const [user, setUser] = useState(null);
  const [authInputs, setAuthInputs] = useState({
    email: "",
    password: "",
  });

  const authHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAuthInputs({...authInputs, [name]: value});
  }

  return {authInputs, setAuthInputs, authHandleChange, user, setUser};
};

export default AuthHooks;
