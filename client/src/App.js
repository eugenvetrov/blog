import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  console.log('dsfsdf')


  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      
      const tokenRes = await axios.post(
        "http://localhost:9000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:9000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
      <Router>
         <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
            <div className="container-fluid">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </div>
          </UserContext.Provider>
        </Router>
  )
}

export default App
