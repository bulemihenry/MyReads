import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Search from "./components/Search";
import Books from "./components/Books";
import "./App.css";

const App = () => {
  const [bookshelves, setbookshelves] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const shelves = await BooksAPI.getAll();
      setbookshelves(shelves);
    })();
  }, []);
  return (
    <div>
      <Router>
        {/* <NavBar /> */}
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Books {...props} shelves={bookshelves} />}
          ></Route>
          <Route
            exact
            path="/search"
            render={(props) => <Search {...props} shelves={bookshelves} />}
          />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
