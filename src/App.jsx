import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./CSS/App.css";

import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";

function App() {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(false);

  const changeToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    console.log("Set token to:", newToken);
  };

  const deleteToken = () => {
    localStorage.clear();
    setToken(null);
    console.log("Cleared token.");
    setAdmin(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      console.log("App started, set token to:", localStorage.getItem("token"));
    } else {
      console.log("App started, no token.");
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="App">
        {token ? (
          <Switch>
            <Route exact path="/">
              <Homepage admin={admin} token={token} />
            </Route>
            <Route exact path="/hello">
              <h2>hello</h2>
            </Route>
          </Switch>
        ) : (
          <Login setAdmin={setAdmin} changeToken={changeToken} />
        )}
      </div>
    </Router>
  );
}

export default App;
