import React, { useState } from "react";

import { useAuth } from "../firebase/AuthContext";

export default function LoginPage() {
  const authContext = useAuth();
  const [username, setUserName] = useState<string>("");

  const handleSubmit = () => {
    if (!username) {
      alert("log in fail");
    } else if (authContext && authContext.login) {
      authContext.login(username);
    }
  };

  return (
    <div>
      <p>Please enter a username log in the system</p>
      <div>
        <div>
          <input
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}
