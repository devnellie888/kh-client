import React from "react";

import { PuffLoader } from "react-spinners";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

import getLocalDate from "utils/getLocalDate";
import { moveToTrash } from "api/admin/requests";
import { getDevices } from "api/admin/requests";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { sortByKey } from "utils/sorting";
import { sortByDate } from "utils/sorting";

const GetDevices = () => {
  const [trashDevices, setTrashDevices] = React.useState([]);
  const [trashLoader, setTrashLoader] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [deviceList, setDeviceList] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  const [sorting, setSorting] = React.useState(false);

  const hover = (e, key) => {
    e.preventDefault();
    let deviceRow = document.getElementById(`deviceRow_${key}`);

    deviceRow.style.backgroundColor =
      deviceRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  const markDelete = (e, imei) => {
    e.target.checked
      ? setTrashDevices([
          ...trashDevices.filter((trashDevice) => trashDevice !== imei),
          imei,
        ])
      : setTrashDevices([
          ...trashDevices.filter((trashDevice) => trashDevice !== imei),
        ]);
  };

  const trashDevicesCall = () => {
    setTrashLoader(true);

    // console.log("tarash device call ",trashDevices)
    // const filterData= deviceList.filter(device=>trashDevices.indexOf(device.imei)<0);
    // console.log("after tarash device call ",filterData)

    moveToTrash(trashDevices, () => {
      fatchDevice(); //fatch device
      // setTrashLoader(false);
      setTrashDevices([]);
    });
  };

  const fatchDevice = () => {
    getDevices({ skip: 0 }, (data) => {
      setDeviceList(data);
      setFilteredData(data);
      setTrashLoader(false);
      console.log("data get device ", deviceList);
    });
  };
  React.useEffect(() => {
    setTrashLoader(true);
    if (deviceList.length < 1) {
      fatchDevice();
    }
    return () => setDeviceList([]);
  }, [getDevices]);

  const sortToggal = (key) => {
    const sortDeviceList = deviceList.sort((a, b) => {
      console.log(a[key]);
      if (new Date(a[key]) < new Date(b[key])) {
        return sorting ? 1 : -1;
      }
      if (new Date(a[key]) > new Date(b[key])) {
        return sorting ? -1 : 1;
      }
      return 0;
    });
    setDeviceList(sortDeviceList);
    setSorting(!sorting);
  };

  const getMoreDevices = () => {
    console.log("call get moreSS", deviceList.length);
    getDevices({ skip: deviceList.length }, (data) => {
      setDeviceList((prevDevice) => [...prevDevice, ...data]);
      console.log("data get device ", deviceList);
    });
  };

  const handleFilter = (value) => {
    const newData = deviceList.filter(
      (log) =>
        log.imei.toLowerCase().includes(value.toLowerCase()) ||
        log.model.toLowerCase().includes(value.toLowerCase()) ||
        log.ipAddr.toLowerCase().includes(value.toLowerCase())
      // log.type.toLowerCase().includes(value.toLowerCase()) ||
      // log.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newData);
  };

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <BottomScrollListener onBottom={() => {}}>
          {(scrollRef) => (
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
              }
              style={{ height: 535, overflowY: "scroll" }}
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex flex-grow flex-1 justify-between">
                    <h3
                      className={"font-semibold text-lg text-blueGray-700"}
                      style={{ float: "left" }}
                    >
                      All Devices
                    </h3>
                    {/* <div
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
                </div> */}
                    {trashDevices.length > 0 ? (
                      <>
                        <button
                          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          style={{ float: "right" }}
                          onClick={() => setShowModal(true)}
                        >
                          <i className="fas fa-trash"></i>&nbsp; Trash Devices (
                          {trashDevices.length})
                        </button>
                        {showModal ? (
                          <>
                            <div
                              style={{
                                top: "0px",
                                right: "0px",
                                bottom: "0px",
                                left: "0px",
                                backgroundColor: "#0000005e",
                              }}
                              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <div className="relative w-auto my-6 mx-auto max-w-sm">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                      Delete Confirmation
                                    </h3>
                                    <button
                                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                      onClick={() => setShowModal(false)}
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
                                      Are you sure you want to move selected
                                      devices to trash?
                                    </p>
                                  </div>
                                  {/*footer*/}
                                  <div
                                    style={{ padding: "20px" }}
                                    className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
                                  >
                                    <button
                                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={trashDevicesCall}
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="block w-full ">
                {trashLoader ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    ref={scrollRef}
                  >
                    <PuffLoader />
                  </div>
                ) : (
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left g-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const sortedData = sortByKey(
                              deviceList,
                              sorting,
                              "imei"
                            );
                            setFilteredData(sortedData);
                            setSorting(!sorting);
                          }}
                        >
                          IMEI / IP Address <i class="fas fa-sort"></i>
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const sortedData = sortByDate(
                              deviceList,
                              sorting,
                              "date"
                            );
                            setFilteredData(sortedData);
                            setSorting(!sorting);
                          }}
                        >
                          Date Created <i class="fas fa-sort"></i>
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const sortedData = sortByDate(
                              deviceList,
                              sorting,
                              "updated"
                            );
                            setFilteredData(sortedData);
                            setSorting(!sorting);
                          }}
                        >
                          Status / Updated On <i class="fas fa-sort"></i>
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const sortedData = sortByKey(
                              deviceList,
                              sorting,
                              "model"
                            );
                            setFilteredData(sortedData);
                            setSorting(!sorting);
                          }}
                        >
                          Device <i class="fas fa-sort"></i>
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        >
                          Permission Score
                        </th>
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          }
                        ></th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredData.map(
                        (device, key) =>
                          device.box === "inbox" && (
                            <tr
                              id={`deviceRow_${key}`}
                              className="deviceRow"
                              key={key}
                              onMouseEnter={(e) => hover(e, key)}
                              onMouseLeave={(e) => hover(e, key)}
                              style={{ backgroundColor: "white" }}
                            >
                              <th>
                                <Link
                                  to={{
                                    pathname: `/admin/devices/${device.imei}`,
                                    state: device,
                                  }}
                                  // {`/admin/devices/${device.imei}`}
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left flex items-center h-full"
                                >
                                  <img
                                    data-tip
                                    data-for={"r" + key}
                                    // src={`https://www.countryflags.io/${device?.ipInfo?.countryCode.toLowerCase()}/flat/32.png`}
                                    src={`https://flagcdn.com/32x24/${device?.ipInfo?.countryCode.toLowerCase()}.png`}
                                    className="h-6 w-6"
                                    alt="..."
                                  ></img>
                                  <ReactTooltip
                                    id={"r" + key}
                                    aria-haspopup="true"
                                    role="example"
                                  >
                                    <h2 style={{ textDecoration: "underline" }}>
                                      IP Details
                                    </h2>
                                    <br />
                                    Location:{" "}
                                    <span className="font-normal text-lightBlue-300">
                                      {device.ipInfo.city},{" "}
                                      {device.ipInfo.regionName},{" "}
                                      {device.ipInfo.country}
                                    </span>
                                    <br />
                                    Organisation:{" "}
                                    <span className="font-normal text-lightBlue-300">
                                      {device.ipInfo.org}
                                    </span>
                                    <br />
                                    ISP:{" "}
                                    <span className="font-normal text-lightBlue-300">
                                      {device.ipInfo.isp}
                                    </span>
                                  </ReactTooltip>
                                  <div className="flex flex-col justify-center h-16">
                                    <span
                                      className={
                                        "w-full ml-3 font-bold text-blueGray-600"
                                      }
                                    >
                                      {device.imei}
                                    </span>
                                    <span
                                      className={
                                        "ml-3 font-normal text-blueGray-400"
                                      }
                                    >
                                      {device.ipAddr}
                                    </span>
                                  </div>
                                </Link>
                              </th>
                              <td>
                                <Link
                                  to={`/admin/devices/${device.imei}`}
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left flex items-center h-full"
                                >
                                  <span className={"w-full"}>
                                    {getLocalDate(device.date)}
                                  </span>
                                </Link>
                              </td>
                              <td className="h-0">
                                <Link
                                  to={`/admin/devices/${device.imei}`}
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col justify-center h-full"
                                >
                                  <span
                                    className={
                                      "w-full font-bold text-blueGray-600"
                                    }
                                  >
                                    <i className="fas fa-circle text-teal-500 mr-2"></i>{" "}
                                    active
                                  </span>
                                  <span
                                    className={
                                      "w-full font-normal text-blueGray-400"
                                    }
                                  >
                                    {getLocalDate(device.updated)}
                                  </span>
                                </Link>
                              </td>
                              <td className="h-0">
                                <Link
                                  to={`/admin/devices/${device.imei}`}
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center h-full"
                                >
                                  <img
                                    src={(() => {
                                      try {
                                        return require(`assets/img/${device.targetApp}.jpg`)
                                          .default;
                                      } catch (e) {
                                        return require(`assets/img/react.jpg`)
                                          .default;
                                      }
                                    })()}
                                    alt="..."
                                    className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                  ></img>

                                  <div className="flex flex-col justify-center h-16">
                                    <span
                                      className={
                                        "w-full ml-3 font-bold text-blueGray-600"
                                      }
                                    >
                                      {device.targetApp}
                                    </span>
                                    <span
                                      className={
                                        "ml-3 font-normal text-blueGray-400"
                                      }
                                    >
                                      {device.model}
                                    </span>
                                    <span
                                      className={
                                        "ml-3 font-normal text-blueGray-500"
                                      }
                                    >
                                      Android ver: {device.version}|App ver:{" "}
                                      {device.appVersion}
                                    </span>
                                  </div>
                                </Link>
                              </td>
                              <td className="h-0">
                                <Link
                                  data-tip
                                  data-for={"address" + key}
                                  to={`/admin/devices/${device.imei}`}
                                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center h-full"
                                >
                                  <span
                                    className={" text-blueGray-600"}
                                    style={{ width: 200, overflow: "hidden" }}
                                  >
                                    {/* {device.address=="N"?"N/A":device.address.location!=undefined?device.address.location.address} */}
                                    {device.address.location != undefined
                                      ? device.address.location.address
                                      : "N/A"}
                                  </span>
                                  <span>
                                    {" "}
                                    {device.address.location != undefined
                                      ? " ... "
                                      : "    "}
                                  </span>
                                </Link>
                                <ReactTooltip
                                  id={"address" + key}
                                  aria-haspopup="true"
                                  role="example"
                                >
                                  <h2 style={{ textDecoration: "underline" }}>
                                    Address Details
                                  </h2>
                                  Location:{" "}
                                  <span className="font-normal text-lightBlue-300">
                                    {device.address.location != undefined
                                      ? device.address.location.address
                                      : "N/A"}
                                  </span>
                                </ReactTooltip>
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <div>
                                  <label>
                                    <input
                                      id="customCheckLogin"
                                      type="checkbox"
                                      className="form-checkbox rounded text-blueGray-700 ml-1 w-7 h-7 ease-linear transition-all duration-150"
                                      style={{ padding: "10px" }}
                                      onClick={(e) =>
                                        markDelete(e, device.imei)
                                      }
                                    />
                                  </label>
                                </div>
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </BottomScrollListener>
      </div>
    </div>
  );
};

export default GetDevices;
