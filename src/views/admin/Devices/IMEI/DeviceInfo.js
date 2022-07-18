import React from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { getDeviceInfo } from "api/admin/requests";
import getLocalDate from "utils/getLocalDate";
import { PuffLoader } from "react-spinners";
import Modal from "../../../../components/Modal/Modal";
import { sortById } from "utils/sorting";
import { sortByKey } from "utils/sorting";

const DeviceInfo = ({ imei }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [deviceInfo, setDeviceInfo] = React.useState([]);
  const [filteredDeviceInfo, setFilteredDeviceInfo] = React.useState([]);
  const [inputFilter, setInputFilter] = React.useState({ idInput: false });
  const [sorting, setSorting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hover = (e, key) => {
    e.preventDefault();
    let deviceRow = document.getElementById(`deviceRow${key}`);
    deviceRow.style.backgroundColor =
      deviceRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  React.useEffect(() => {
    if (deviceInfo.length < 1) {
      setLoading(true);
      getDeviceInfo({ imei, skip: 0 }, (data) => {
        setLoading(false);
        setDeviceInfo(data);
        setFilteredDeviceInfo(data);
      });
    }

    // console.log(`%c DeviceInfo Render for ${imei}`, "color: blue");
    // console.log(deviceInfo);
  }, [imei, deviceInfo.length, getDeviceInfo]);

  const sortToggal = (key) => {
    const sortDeviceInfo = deviceInfo.sort((a, b) => {
      console.log(a[key]);
      if (new Date(a[key]) < new Date(b[key])) {
        return sorting ? 1 : -1;
      }
      if (new Date(a[key]) > new Date(b[key])) {
        return sorting ? -1 : 1;
      }
      return 0;
    });
    setFilteredDeviceInfo(sortDeviceInfo);
    setSorting(!sorting);
  };

  const toggalModal = () => {
    setShowModal(!showModal);
  };

  const getInfo = () => {
    getDeviceInfo({ imei, skip: deviceInfo.length }, (data) => {
      setDeviceInfo((prevInfo) => [...prevInfo, ...data]);
      setFilteredDeviceInfo((prevInfo) => [...prevInfo, ...data]);
    });
  };

  const handleFilter = (value) => {
    const newDeviceInfo = deviceInfo.filter(
      (liveInfo) =>
        liveInfo.uid.includes(value) ||
        liveInfo.recordDate.includes(value) ||
        liveInfo.triggerName.includes(value) ||
        liveInfo.location.address.includes(value) ||
        liveInfo.ipAddr.includes(value)
    );
    setFilteredDeviceInfo(newDeviceInfo);
  };

  const filterBody = (
    <>
      <div class="flex items-center">
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          From
        </label>
        <input
          id="remember-me"
          name="remember-me"
          type="date"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      </div>
      <div class="flex items-center">
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          To
        </label>
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      </div>
    </>
  );

  return (
    <>
      <Modal
        // setShowModal={setShowModal}
        toggalModal={toggalModal}
        showModal={showModal}
        body={filterBody}
        test="hiii"
      />
      <BottomScrollListener onBottom={getInfo}>
        {(scrollRef) => (
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            }
            style={{ height: 535, overflowY: "scroll" }}
            ref={scrollRef}
            // onScroll={(e) => onPageRequest(e)}
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className={"font-semibold text-lg text-blueGray-700"}
                    style={{ float: "left" }}
                  >
                    Live Info
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

            {!loading && deviceInfo ? (
              deviceInfo.length < 1 ? (
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
                          // setInputFilter({ idInput: true });
                          // setFilteredDeviceInfo(deviceInfo);
                          const sortedData = sortById(deviceInfo, sorting);
                          setFilteredDeviceInfo(sortedData);
                          setSorting(!sorting);
                        }}
                      >
                        ID <i class="fas fa-sort"></i>
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        onClick={() => sortToggal("recordDate")}
                        style={{ cursor: "pointer" }}
                      >
                        Date <i class="fas fa-sort"></i>
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const sortedData = sortByKey(
                            deviceInfo,
                            sorting,
                            "ipAddr"
                          );
                          setFilteredDeviceInfo(sortedData);
                          setSorting(!sorting);
                        }}
                      >
                        IP Address <i class="fas fa-sort"></i>
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        Location
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      // (inputFilter.idInput
                      //   ? filteredDeviceInfo
                      //   : deviceInfo
                      // )

                      filteredDeviceInfo.map((liveInfo, key) => (
                        <tr
                          id={`deviceRow${key.toString()}`}
                          key={key.toString()}
                          onMouseEnter={(e) => hover(e, key.toString())}
                          onMouseLeave={(e) => hover(e, key.toString())}
                        >
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
                            <div className="flex flex-col justify-center">
                              <span
                                className={"w-full font-bold text-blueGray-600"}
                              >
                                {liveInfo.uid}
                              </span>
                            </div>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <div className="flex flex-col justify-center">
                              <span
                                className={"w-full font-bold text-blueGray-600"}
                              >
                                {getLocalDate(liveInfo.recordDate)}
                              </span>
                              <span className={"w-full text-blueGray-600"}>
                                {liveInfo.triggerName}
                              </span>
                            </div>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <div className="flex flex-col justify-center">
                              <span className={"w-full text-blueGray-600"}>
                                {liveInfo.ipAddr}
                              </span>
                            </div>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                            <div className="flex flex-col justify-center">
                              <span
                                className={"w-full font-bold text-blueGray-600"}
                              >
                                {liveInfo.location.lat},{" "}
                                {liveInfo.location.long}
                              </span>
                              <span className={"w-full text-blueGray-600"}>
                                {liveInfo.location.address}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
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
    </>
  );
};

export default DeviceInfo;
