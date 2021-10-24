import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Search from "./components/Search";
import Books from "./components/Books";
import "./App.css";

const App = () => {
  return (
    <div>
      <Router>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/" component={Books}></Route>
          <Route exact path="/search" component={Search} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
