import axios from "axios";

// import { setAlert } from "api/alerts/requests";
// import setAuthToken from "utils/setAuthToken";

const { url, requestConfig, routes } = require("config.js")();

export const register = async(body) => {
  try {
    console.log(body);
    const res = await axios.post(
      `${url}${routes.register}`,
      body,
      requestConfig
    );

    // dispatch({
    //   type: "register",
    //   userData: res.data,
    // });

    // dispatch(
    //   setAlert(
    //     `user ${res.data.username} registered successfully with ${res.data.role} privileges`,
    //     "bg-orange-500"
    //   )
    // );
  } catch (e) {
    // dispatch({
    //   type: "dataError",
    // });

    const errors = e.response ? e.response.data.errors : null;
    // if (errors)
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "bg-red-500")));
    // else dispatch(setAlert(e.toString(), "bg-orange-500"));
  }
};

// export const login = (body) => async (dispatch) => {
//   try {
//     const res = await axios.post(`${url}${routes.login}`, body, requestConfig);
//     dispatch({
//       //shift inside if(res.data.token)
//       type: "login",
//       userData: res.data,
//       loaded: true,
//     });

//     if (res.data.token) {
//       // setAuthToken(res.data.token);
//       axios.defaults.headers.common["x-auth-token"] = res.data.token;
//       localStorage.setItem("token", res.data.token);
//     }
//   } catch (e) {
//     console.log(e);
//     // setAuthToken();
//     dispatch({
//       type: "authError",
//       loaded: false,
//     });

//     const errors = e.response ? e.response.data.errors : null;
//     if (errors)
//       errors.forEach((error) => dispatch(setAlert(error.msg, "bg-red-500")));
//     else dispatch(setAlert(e.toString(), "bg-orange-500"));
//   }
// };

// export const loadUser = (path) => async (dispatch) => {
//   if (localStorage.token) {
//     // setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.post(`${url}${routes.auth}`);
//     dispatch({
//       type: "login",
//       userData: res.data,
//       path,
//     });
//   } catch (e) {
//     console.log(e);
//     // setAuthToken();

//     dispatch({
//       type: "authError",
//       path: "/auth",
//     });
//   }
// };

export const login = async (body) => {
  try {
    const res = await axios.post(`${url}${routes.login}`, body, requestConfig);
    // console.log("login requestedc        -------------- ",res.data)
    if (res.data.token) {
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      localStorage.setItem("token", res.data.token);
      return res;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const checkAuth = async () => {
  try {
    const res = await axios.get(`${url}/isAuthanticate`, requestConfig);
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};
