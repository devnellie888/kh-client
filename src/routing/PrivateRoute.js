import React from "react";
import { connect } from "react-redux";
import Preloader from "layouts/Preloader";
import { Route } from "react-router-dom";
import Auth from "layouts/Auth";
import Admin from "layouts/Admin";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log("user data ",user)
  return (
    <Route
      {...rest}
      render={(props) =>
        user.loggedIn ? (
          user.path.substring(0, 5) === "/auth" ? (
            <Admin {...props} />
          ) : (
            <Component {...props} />
          )
        ) : user.path && user.path.substring(0, 5) === "/auth" ? (
          // null
          <Auth />
        ) : (
          <Preloader />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return { user: state.userApi };
};

export default connect(mapStateToProps)(PrivateRoute);
