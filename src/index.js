import React, { useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import configureStore from "api";
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import { checkAuth } from "api/auth/requests";
import Preloader from "layouts/Preloader";
import axios from "axios";

const api = configureStore();
export const DataContext = createContext();

const App = () => {
  const [fileRequest, setFileRequest] = React.useState(0);
  const [isAuthanticate, setIsAuthanticate] = React.useState(false);
  const [loader ,setLoader]=React.useState(true)

  async function checkAuthanticate() {
    const responce = await checkAuth();
    if (responce&&responce.status === 200) {
      setIsAuthanticate(true);
      setLoader(false)
      return true;
    } else {
      setIsAuthanticate(false);
      setLoader(false)
      return false
    }
  }
  useEffect(() => {
    setLoader(true)
    axios.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("token");
    checkAuthanticate();
  }, []);

  if(loader){
    return <Preloader />
  }
  return (
    <Provider store={api}>
      <DataContext.Provider
        value={{
          setFileRequest: setFileRequest,
          fileRequest: fileRequest,
          setIsAuthanticate: setIsAuthanticate,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={() => (isAuthanticate ? <Admin /> : <Auth />)}
            />
            <Route path="/static/*" />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </DataContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
