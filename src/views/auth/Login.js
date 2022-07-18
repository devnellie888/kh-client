import React from "react";
// import { connect } from "react-redux";
import { PuffLoader } from "react-spinners";

import { login } from "api/auth/requests";

import { DataContext } from "index";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loading, setLodaing] = React.useState(false);
  const { setIsAuthanticate } = React.useContext(DataContext);
  const [error, setError] = React.useState("");
  const history = useHistory();

  const processForm = async (e) => {
    setError("");
    e.preventDefault();

    let { username, password } = e.target.elements;

    console.log("username", username, password);

    if (username.value.length < 3) {
      setError("Please enter your username!");
      return;
    }
    if (password.value.length < 6) {
      setError("Please enter your password!");
      return;
    }
    setLodaing(true);
    const res = await login({
      username: username.value,
      password: password.value,
    });
    if (res && res.status === 200) {
      // window.location.href = "/admin";
      history.push("/");
      setIsAuthanticate(true);
    } else {
      // window.location.href = "/auth/login";
      setError("Please enter valid credentials!");
      // setIsAuthanticate(false)
      history.push("/auth/login");
    }
    setLodaing(false);
  };


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6"></div>
             
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={processForm}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Username"
                        name="username"
                      
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                      
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        name="password"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Sign In {loading? <PuffLoader size={18} color="white" />:<></>}
                      </button>
                      <br />
                      <br />
                      {error.length > 1 ? (
                        <div
                          className={`text-white px-6 py-4 border-0 rounded relative mb-4 `}
                          style={{ background: "#ef4444" }}
                        >
                          <span className="inline-block align-middle mr-8">
                            {error}
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </form>
                </div>
               {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Login;
