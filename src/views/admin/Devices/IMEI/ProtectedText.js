import React from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { getProtectedText } from "api/admin/requests";
import getLocalDate from "utils/getLocalDate";
import { PuffLoader } from "react-spinners";
import { sortByDate } from "utils/sorting";
import { sortById } from "utils/sorting";

const ProtectedText = ({ imei }) => {
  const [protectedText, setProtectedText] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const [sorting, setSorting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hover = (e, key) => {
    e.preventDefault();
    let protectedTextRow = document.getElementById(`protectedTextRow${key}`);
    protectedTextRow.style.backgroundColor =
      protectedTextRow.style.backgroundColor === "aliceblue"
        ? "white"
        : "aliceblue";
  };

  React.useEffect(() => {
    setLoading(true);
    if (protectedText.length < 1)
      getProtectedText({ imei, skip: 0 }, (data) => {
        setLoading(false);
        setProtectedText(data);
        setFilteredData(data);
      });
    console.log(`%c protectedTextLogs Render for ${imei}`, "color: blue");

    // console.log("protectedText data -- ",protectedText)
  }, [getProtectedText, imei]);

  const getProtectedTexts = () => {
    getProtectedText({ imei, skip: protectedText.length }, (data) => {
      setProtectedText((prevProtectedText) => [...prevProtectedText, ...data]);
      setFilteredData((prevProtectedText) => [...prevProtectedText, ...data]);
    });
  };
  const handleFilter = (value) => {
    const newData = protectedText.filter(
      (log) =>
        log.uid.toLowerCase().includes(value.toLowerCase()) ||
        log.recordDate.toLowerCase().includes(value.toLowerCase()) ||
        log.title.toLowerCase().includes(value.toLowerCase()) ||
        log.type.toLowerCase().includes(value.toLowerCase()) ||
        log.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newData);
  };
  return (
    <BottomScrollListener onBottom={getProtectedTexts}>
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
                  ProtectedText Logs
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

          {!loading && protectedText ? (
            protectedText.length < 1 ? (
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
                        const sortedData = sortById(protectedText, sorting);
                        setFilteredData(sortedData);
                        setSorting(!sorting);
                      }}
                    >
                      ID <i class="fas fa-sort"></i></th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const sortedData = sortByDate(
                          protectedText,
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
                  {filteredData.map((protectedTextLog, key) => (
                    <tr
                      id={`protectedTextRow${key.toString() + key.toString()}`}
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
                          {console.log(
                            "protectedText - ",
                            protectedTextLog.uid
                          )}
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {protectedTextLog.uid}
                          </span>
                        </div>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {getLocalDate(protectedTextLog.recordDate)}
                          </span>
                          <span className={"w-full text-blueGray-600"}>
                            {protectedTextLog.triggerName}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {protectedTextLog.title}
                          </span>
                          <span className={"w-full text-blueGray-600"}>
                            {protectedTextLog.message}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <span className={"w-full ml-3"}>
                          {protectedTextLog.type}
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

export default ProtectedText;
