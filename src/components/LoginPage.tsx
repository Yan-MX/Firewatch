import React, { useState } from "react";

import { useAuth } from "../firebase/AuthContext";

export default function LoginPage() {
  const authContext = useAuth();
  const [username, setUserName] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!username) {
      setValidationError(true);
    } else if (authContext && authContext.login) {
      authContext.login(username);
    }
  };

  return (
    <div>
      <p>Create a user or sign in to start playing!</p>
      <div>
        <div>
          <input
            value={username}
            onChange={(e) => {
              setValidationError(false);
              setUserName(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}
