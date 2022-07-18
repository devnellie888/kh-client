import React from "react";
import BarLoader from "react-spinners/BarLoader";

class Preloader extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BarLoader width="50%" height="6px" color="#0284c7" />
      </div>
    );
  }
}

export default Preloader;
