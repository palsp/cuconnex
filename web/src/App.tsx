import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  AuthPage,
  PersonalInfoPage,
  SelectInterestPage,
  FriendsPage,
  TestPage,
  SuccessPage,
  MyTeamPage,
  ProfilePage,
  LandingPage,
  SelectEventPage,
  SelectTeamPage,
  SelectMemberPage,
  TeamDetail,
  ExplorePage,
  NotificationPage,
  CreateTeamPage,
  PushPage,
  RatingPage,
} from "@pages/index";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import classes from "./App.module.css";
import CreateTeamPrompt from "@pages/CreateTeamPage/CreateTeamPrompt/CreateTeamPrompt";
import { ErrorContext } from "@context/ErrorContext";

const App: React.FC = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setErrorHandler } = useContext(ErrorContext);
  const [heightStyle, setHeightStyle] = useState({});

  useEffect(() => {
    setHeightStyle({ height: `${window.innerHeight}px` });
  }, []);

  const routes = isAuthenticated ? (
    <Switch location={location} key={location.pathname}>
      <Route path="/" exact component={AuthPage} />
      <Route path="/selectinterests" exact component={SelectInterestPage} />
      <Route path="/personalInformation" exact component={PersonalInfoPage} />
      <Route path="/friendlists" exact component={FriendsPage} />
      <Route path="/success" exact component={SuccessPage} />
      <Route path="/landing" exact component={LandingPage} />
      <Route path="/myteams" exact component={MyTeamPage} />
      <Route path="/profile" exact component={ProfilePage} />
      <Route path="/selectevents" exact component={SelectEventPage} />
      <Route path="/selectteams" exact component={SelectTeamPage} />
      <Route path="/post" exact component={PushPage} />
      <Route path="/selectmember" exact component={SelectMemberPage} />
      <Route path="/createteam" exact component={CreateTeamPage} />
      <Route path="/teamdetail" exact component={TeamDetail} />
      <Route path="/explore" exact component={ExplorePage} />
      <Route path="/notification" exact component={NotificationPage} />
      <Route path="/testprompt" exact component={CreateTeamPrompt} />
      <Route path="/rating" exact component={RatingPage} />
      <Route path="/test" exact component={TestPage} />
      {/* <Route path="/findteams" exact component={FindTeamPage} /> */}
      {/* <Route path="/recruitmembers" exact component={RecruitMemberPage} /> */}
      {/* <Route path="/" component={LandingPage} /> */}
    </Switch>
  ) : (
    <Switch location={location} key={location.pathname}>
      <Route path="/" exact component={AuthPage} />
      <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
    </Switch>
  );

  return (
    <div className={classes.mainContainer} style={heightStyle}>
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          {routes}
        </AnimatePresence>
      </AuthenticatedContext.Provider>
    </div>
  );
};

export default App;
