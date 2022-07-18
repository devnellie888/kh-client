import React from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { getTelegram } from "api/admin/requests";
import getLocalDate from "utils/getLocalDate";
import { PuffLoader } from "react-spinners";
import { sortById } from "utils/sorting";
import { sortByDate } from "utils/sorting";

const Telegram = ({ imei }) => {
  const [telegram, setTelegram] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const [sorting, setSorting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hover = (e, key) => {
    e.preventDefault();
    let telegramRow = document.getElementById(`telegramRow${key}`);
    telegramRow.style.backgroundColor =
      telegramRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  React.useEffect(() => {
    if (telegram.length < 1) {
      setLoading(true);
      getTelegram({ imei, skip: 0 }, (data) => {
        setLoading(false);
        setTelegram(data);
        setFilteredData(data);
      });
    }

    console.log(`%c TelegramLogs Render for ${imei}`, "color: blue");
  }, [telegram.length, imei, getTelegram]);

  const getTelegrams = () => {
    getTelegram({ imei, skip: telegram.length }, (data) => {
      setTelegram((prevData) => [...prevData, ...data]);
      setFilteredData((prevData) => [...prevData, ...data]);
    });
  };

  const handleFilter = (value) => {
    const newData = telegram.filter(
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
    <BottomScrollListener onBottom={getTelegrams}>
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
                  Telegram Logs
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

          {!loading && telegram ? (
            telegram.length < 1 ? (
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
                        const sortedData = sortById(telegram, sorting);
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
                          telegram,
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
                  {filteredData.map((telegramLog, key) => (
                    <tr
                      id={`telegramRow${key.toString() + key.toString()}`}
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
                            {telegramLog.uid}
                          </span>
                        </div>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {getLocalDate(telegramLog.recordDate)}
                          </span>
                          <span className={"w-full text-blueGray-600"}>
                            {telegramLog.triggerName}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        <div className="flex flex-col justify-center">
                          <span
                            className={"w-full font-bold text-blueGray-600"}
                          >
                            {telegramLog.title}
                          </span>
                          <span className={"w-full text-blueGray-600"}>
                            {telegramLog.message}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <span className={"w-full ml-3"}>
                          {telegramLog.type}
                          {/* {telegramLog.type === "sent" ? (
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
                    )} */}
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

export default Telegram;
