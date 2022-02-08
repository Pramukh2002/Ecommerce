import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {Root} from "./components/Root";
import {Products} from "./components/Products";

import {Router, Route, browserHistory} from "react-router";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    // ReactDOM.render((
    //   <Router history="browserHistory">
    //     <Route path={"user"} component={Products} />
    //     <Route path={"home"} component={Root} />
    //   </Router>
    // ), document.body)
    <Root>
      <Products></Products>
    </Root>
  );
}

export default App;