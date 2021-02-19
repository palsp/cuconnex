import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SelectInterestPage from "./Pages/SelectInterestPage/SelectInterestPage";

const App: React.FC = () => {
  let routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/selectinterests" exact component={SelectInterestPage} />

        <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
      </Switch>
    </BrowserRouter>
  );
  return <div>{routes}</div>;
};

export default App;
