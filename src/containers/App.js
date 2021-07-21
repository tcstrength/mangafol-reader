import { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Tales from "./Tales";
import Logout from "./Logout";
import TaleDetails from "./TaleDetails";
import TaleEdit from "./TaleEdit";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header></Header>

          <div className="content">
            <Switch>

              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" component={Logout} />
              <Route path="/tales/:id/edit" component={TaleEdit} />
              <Route path="/tales/:id" component={TaleDetails} />
              <Route path="/tales" component={Tales} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          <Footer></Footer>
        </div>
      </Router>
    )
  }
}

export default App;
