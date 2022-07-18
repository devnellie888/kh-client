import React from "react";
import ReactTooltip from "react-tooltip";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { getSmsLogs } from "api/admin/requests";
import getLocalDate from "utils/getLocalDate";
import { PuffLoader } from "react-spinners";
import { sortById, sortByKey, sortByDate } from "utils/sorting";

const SmsLogs = ({ imei }) => {
  const [smsLogs, setSmsLogs] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [sorting, setSorting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hover = (e, key) => {
    e.preventDefault();
    let smsLogsRow = document.getElementById(`smsRow${key}`);
    smsLogsRow.style.backgroundColor =
      smsLogsRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  React.useEffect(() => {
    if (smsLogs.length < 1) {
      setLoading(true);
      getSmsLogs({ imei, skip: 0 }, (data) => {
        setLoading(false);
        setSmsLogs(data);
        setFilteredData(data);
      });
    }

    // console.log(`%c smsLogsLogs Render for ${imei}`, "color: blue");
  }, [imei, getSmsLogs]);

  const getSmsLog = () => {
    getSmsLogs({ imei, skip: smsLogs.length }, (data) => {
      setSmsLogs((prevSmsLogs) => [...prevSmsLogs, ...data]);
      setFilteredData((prevSmsLogs) => [...prevSmsLogs, ...data]);
    });
  };

  const handleFilter = (value) => {
    const newData = smsLogs.filter(
      (log) =>
        log.uid.toLowerCase().includes(value.toLowerCase()) ||
        log.recordDate.toLowerCase().includes(value.toLowerCase()) ||
        log.number.toLowerCase().includes(value.toLowerCase()) ||
        log.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newData);
  };
  return (
    <BottomScrollListener onBottom={getSmsLog}>
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
                  Sms Logs
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

          {!loading && smsLogs ? (
            smsLogs.length < 1 ? (
              <h2 style={{ textAlign: "center" }}>Nothing Synced</h2>
            ) : (
              <table className="items-center w-full bg-transparent border-collapse table-fixed">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const sortedData = sortById(smsLogs, sorting);
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
                          smsLogs,
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
                    >
                      IP Address
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                    >
                      Message
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
                  {filteredData.map((smsLog, key) => (
                    // smsLog.smsLogs.map((log, key) => {
                    <tr
                      id={`smsRow${key.toString() + key.toString()}`}
                      key={key.toString() + key.toString()}
                      onMouseEnter={(e) =>
                        hover(e, key.toString() + key.toString())
                      }
                      onMouseLeave={(e) =>
                        hover(e, key.toString() + key.toString())
                      }
                    >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {smsLog.uid}
                          </span>
                        </div>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {getLocalDate(smsLog.recordDate)}
                          </span>
                          <span className={"w-full text-blueGray-600"}>
                            {smsLog.triggerName}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span className={"w-full text-blueGray-600"}>
                            {smsLog.ipAddr}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {smsLog.number}
                          </span>
                          <span className={"w-full text-blueGray-600"}>
                            {smsLog.message}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <span className={"w-full ml-3"}>
                          {smsLog.type === "sent" ? (
                            <>
                              <i
                                data-tip
                                data-for={"r" + key.toString() + key.toString()}
                                className="text-lightBlue-500 fas fa-arrow-alt-circle-up text-base mr-1"
                              ></i>
                              <ReactTooltip
                                id={"r" + key.toString() + key.toString()}
                                aria-haspopup="true"
                                role="example"
                              >
                                Sent
                              </ReactTooltip>
                            </>
                          ) : (
                            <>
                              <i
                                data-tip
                                data-for={"r" + key.toString() + key.toString()}
                                className="text-pink-400 fas fa-arrow-alt-circle-down text-base mr-1"
                              ></i>
                              <ReactTooltip
                                id={"r" + key.toString() + key.toString()}
                                aria-haspopup="true"
                                role="example"
                              >
                                Recieved
                              </ReactTooltip>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
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

export default SmsLogs;
