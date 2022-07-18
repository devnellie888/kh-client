import React from "react";
import ReactTooltip from "react-tooltip";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { getCallLogs } from "api/admin/requests";
import getLocalDate from "utils/getLocalDate";
import { PuffLoader } from "react-spinners";
import { sortById, sortByKey, sortByDate } from "utils/sorting";

const CallLogs = ({ imei, setLoaded }) => {
  const [callLogs, setCallLogs] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [sorting, setSorting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hover = (e, key) => {
    e.preventDefault();
    let callRow = document.getElementById(`callRow${key}`);

    callRow.style.backgroundColor =
      callRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  React.useEffect(() => {
    if (callLogs.length < 1) setLoading(true);
    getCallLogs({ imei, skip: 0 }, (data) => {
      setCallLogs(data);
      setFilteredData(data);
      setLoading(false);
      setLoaded((p) => ({ ...p, t3: true }));
    });
    // console.log(`%c CallLogs Render for ${imei}`, "color: red");
  }, [imei, getCallLogs]);

  const getCallog = () => {
    getCallLogs({ imei, skip: callLogs.length }, (data) => {
      setCallLogs((prevCallLogs) => [...prevCallLogs, ...data]);
      setFilteredData((prevCallLogs) => [...prevCallLogs, ...data]);
    });
  };
  const handleFilter = (value) => {
    const newData = callLogs.filter(
      (log) =>
        log.uid.toLowerCase().includes(value.toLowerCase()) ||
        log.recordDate.toLowerCase().includes(value.toLowerCase()) ||
        log.number.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newData);
  };
  return (
    <BottomScrollListener onBottom={getCallog}>
      {(scrollRef) => (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
          }
          style={{ height: 535, overflowY: "scroll" }}
          ref={scrollRef}
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={"font-semibold text-lg text-blueGray-700"}
                  style={{ float: "left" }}
                >
                  CallLogs
                </h3>

                <div
                  className="relative flex w-full flex-wrap items-stretch"
                  style={{ float: "right", width: 300 }}
                >
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Search here..."
                    onChange={(ev) => handleFilter(ev.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto"></div>

          {!loading && callLogs ? (
            callLogs.length < 1 ? (
              <h2 style={{ textAlign: "center" }}>Nothing Synced</h2>
            ) : (
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const sortedData = sortById(callLogs, sorting);
                        setFilteredData(sortedData);
                        setSorting(!sorting);
                      }}
                    >
                      ID <i class="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const sortedData = sortByDate(
                          callLogs,
                          sorting,
                          "recordDate"
                        );
                        setFilteredData(sortedData);
                        setSorting(!sorting);
                      }}
                    >
                      Date <i class="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                      onClick={() => {
                        const sortedData = sortById(
                          callLogs,
                          sorting,
                          "number"
                        );
                        setFilteredData(sortedData);
                        setSorting(!sorting);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Number <i class="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                    >
                      Type
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((callLog, key) => {
                    return (
                      <tr
                        id={`callRow${key.toString()}`}
                        key={key.toString()}
                        onMouseEnter={(e) => hover(e, key.toString())}
                        onMouseLeave={(e) => hover(e, key.toString())}
                      >
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
                          <div className="flex flex-col justify-center">
                            <span
                              className={"w-full font-bold text-blueGray-600"}
                            >
                              {callLog.uid}
                            </span>
                          </div>
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          <div className="flex flex-col justify-center">
                            <span
                              className={"w-full font-bold text-blueGray-600"}
                            >
                              {getLocalDate(callLog.recordDate)}
                            </span>
                            <span className={"w-full text-blueGray-600"}>
                              {callLog.triggerName}
                            </span>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          <div className="flex flex-col justify-center">
                            <span
                              className={"w-full font-bold text-blueGray-600"}
                            >
                              {callLog.number}
                            </span>
                            <span className={"w-full text-blueGray-600"}>
                              {secondsToHms(callLog.duration)}
                            </span>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          <div className="flex flex-col justify-center">
                            <span className={"w-full ml-3 text-blueGray-600"}>
                              {/* {callLog.type !== "null" ? callLog.type : "REJECTED"} */}
                              {(() => {
                                switch (callLog.type) {
                                  case "MISSED":
                                    return (
                                      <>
                                        <i
                                          data-tip
                                          data-for={"r" + key.toString()}
                                          className="text-red-500 fas fa-phone-slash text-base mr-1"
                                        ></i>
                                        <ReactTooltip
                                          id={"r" + key.toString()}
                                          aria-haspopup="true"
                                          role="example"
                                        >
                                          {callLog.type}
                                        </ReactTooltip>
                                      </>
                                    );
                                  case "INCOMING":
                                    return (
                                      <>
                                        <i
                                          data-tip
                                          data-for={"r" + key.toString()}
                                          className="text-pink-400 fas fa-phone text-base mr-1"
                                        ></i>
                                        <ReactTooltip
                                          id={"r" + key.toString()}
                                          aria-haspopup="true"
                                          role="example"
                                        >
                                          {callLog.type}
                                        </ReactTooltip>
                                      </>
                                    );
                                  case "OUTGOING":
                                    return (
                                      <>
                                        <i
                                          data-tip
                                          data-for={"r" + key.toString()}
                                          className="text-lightBlue-500 fas fa-phone-alt text-base mr-1"
                                        ></i>
                                        <ReactTooltip
                                          id={"r" + key.toString()}
                                          aria-haspopup="true"
                                          role="example"
                                        >
                                          {callLog.type}
                                        </ReactTooltip>
                                      </>
                                    );
                                  default:
                                    return (
                                      <>
                                        <i
                                          data-tip
                                          data-for={"r" + key.toString()}
                                          className="text-blueGray-500 fas fa-phone-volume text-base mr-1"
                                        ></i>
                                        <ReactTooltip
                                          id={"r" + key.toString()}
                                          aria-haspopup="true"
                                          role="example"
                                        >
                                          REJECTED
                                        </ReactTooltip>
                                      </>
                                    );
                                }
                              })()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PuffLoader />
            </div>
          )}
        </div>
      )}
    </BottomScrollListener>
  );
};

const secondsToHms = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
};

export default CallLogs;
