import React from "react";
import "./App.css";
import DataVirtual from "./components/DataVirtual";
import DataManage from "./components/DataManage";
import DataExport from "./components/DataExport";
import useFirebaseAuth from "./firebase/useFirebaseAuth";
import { AuthContext } from "./firebase/AuthContext";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
function App() {
  const authContext = useFirebaseAuth();
  return (
    <Router>
      <div className="header space">
        <Link className="textstyle" to="./">
          <h1>FireWatch</h1>
        </Link>
        {authContext.isLoggedIn ? authContext.user?.displayName : "Welcome!"}

        <Link className="textstyle" to="/dataVirtialization">
          Data Virtualization
        </Link>
        <Link className="textstyle" to="/dataManagement">
          Data Management
        </Link>
        <Link className="textstyle" to="/dataExport">
          Data Export
        </Link>
        {authContext.isLoggedIn && (
          <button color="inherit" onClick={authContext.logout}>
            Logout
          </button>
        )}
      </div>
      <Switch>
        <>
          <div className="space readable">
            <AuthContext.Provider value={authContext}>
              <Route path="/" exact component={LoginPage} />
              <Route
                path="/dataVirtialization"
                authenticated={authContext.isLoggedIn}
                component={DataVirtual}
              />
              <Route
                path="/dataManagement"
                authenticated={authContext.isLoggedIn}
                component={DataManage}
              />
              <Route
                path="/dataExport"
                authenticated={authContext.isLoggedIn}
                component={DataExport}
              />
            </AuthContext.Provider>
          </div>
        </>
      </Switch>
    </Router>
  );
}

export default App;
