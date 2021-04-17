import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import { UserDataContext } from "@hooks/UserDataContext";
import {
  AuthPage,
  PersonalInfoPage,
  SelectInterestPage,
  FriendsPage,
  RecruitMemberPage,
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
} from "@pages/index";

import {
  fetchUserDataAPI,
  userLogoutAPI,
  fetchUserDataAPINoAxiosResponse,
  testFetchUserData,
  testIUSER,
} from "@api/index";
import PushPage from "@pages/PushPage/PushPage";
import CreateTeamPage from "@pages/CreateTeamPage/CreateTeamPage";
import classes from "./App.module.css";
import CreateTeamPrompt from "@pages/CreateTeamPage/CreateTeamPrompt/CreateTeamPrompt";
import { IUser } from "@models/index";


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUser>({
    id: "",
    name: "",
    interests: {
      Technology: [],
      Business: [],
      Design: [],
    },
    faculty: "",
    image: "",
  });
  const [redirect, setRedirect] = useState<JSX.Element>();
  const [heightStyle, setHeightStyle] = useState({});

  useEffect(() => {
    setHeightStyle({ height: `${window.innerHeight}px` });
  }, []);

  // useEffect(() => {
  //   // get viewport height and multiply by 1% to get value for vh unit
  //   const vh = window.innerHeight * 0.01;
  //   // then we set the value in the --vh custom property to the root of the element
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, []);

  const fetchDataHandler = async () => {
    try {
      const userData = await fetchUserDataAPI();
      setIsAuthenticated(true);
      console.log("SUCCESS fetchDataHandler", userData);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };

  const fetchDataHandlerNoAxiosResponse = async () => {
    try {
      const userData = await fetchUserDataAPINoAxiosResponse();
      setIsAuthenticated(true);
      console.log("SUCCESS noAxios", userData);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };
  const testIUserFetch = async () => {
    try {
      const userData = await testIUSER();
      setIsAuthenticated(true);
      console.log("SUCCESS testfetchDataHandler", userData);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };
  const testFetch = async () => {
    try {
      const userData = await testFetchUserData();
      setIsAuthenticated(true);
      console.log("SUCCESS testfetchDataHandler", userData);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };
  const logoutHandler = async () => {
    try {
      await userLogoutAPI();
      setIsAuthenticated(false);
      setRedirect(<Redirect to="/" />);
    } catch (e) {
      console.log("FAILED loggingout", e);
    }
  };

  const routes = isAuthenticated ? (
    <BrowserRouter>
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >

        <UserDataContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/" exact component={AuthPage} />
            <Route
              path="/selectinterests"
              exact
              component={SelectInterestPage}
            />
            <Route
              path="/personalInformation"
              exact
              component={PersonalInfoPage}
            />
            <Route path="/friendlists" exact component={FriendsPage} />
            {/* <Route path="/findteams" exact component={FindTeamPage} /> */}
            {/* <Route path="/recruitmembers" exact component={RecruitMemberPage} /> */}
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
             <Route path="/testprompt" exact component={CreateTeamPrompt} />
            <Route path="/test" exact component={TestPage} />
            <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
          </Switch>
        </UserDataContext.Provider>

      </AuthenticatedContext.Provider>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <AuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <Switch>
          <Route path="/" exact component={AuthPage} />
          {redirect}
          <Route path="/" render={() => <h1>Nothing to see here!!!</h1>} />
        </Switch>
      </AuthenticatedContext.Provider>
    </BrowserRouter>
  );

  return (
    <div className={classes.mainContainer} style={heightStyle}>
      {routes}
      <button
        onClick={() => {
          setIsAuthenticated(true);
        }}
      >
        LOG IN
      </button>
      <button
        onClick={() => {
          console.log("show state", isAuthenticated);
        }}
      >
        Show state
      </button>

      <button onClick={fetchDataHandler}>FETCH AxiosResponseT</button>
      <button onClick={fetchDataHandlerNoAxiosResponse}>
        FETCH NOaxiosResponseT
      </button>
      <button onClick={testFetchUserData}>FETCH testFetch</button>
      <button onClick={testIUserFetch}>FETCH IUser</button>

      <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  );
};

export default App;
