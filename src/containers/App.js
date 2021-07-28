import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Store } from "../actions/ApiCalls"
import { Component } from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Home from "./Home";
import TaleDetails from "./TaleDetails";

export default class App extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    var content = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/tales/:slug" component={TaleDetails} />
        <Route path="/" component={Home} />
      </Switch>
    )

    if (Store.userProfile === null || Store.userProfile === undefined) {
      content = <Login />
    }

    return (
      <Router>
        <div className="app">
          <Header></Header>
          <Container className="mt-5">
            {content}
          </Container>
        </div>
      </Router>
    )
  }
}
