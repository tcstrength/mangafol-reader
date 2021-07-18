import { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Tales from "./Tales";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header></Header>

          <div className="content">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/tales">
                <Tales />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>

          <Footer></Footer>
        </div>
      </Router>
    )
  }
}

export default App;
