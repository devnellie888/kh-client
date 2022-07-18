import React from "react";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { getInfo } from "api/admin/requests";
import FileStatus from "./FileListing/fileStatus";
const { url } = require("config.js")();

const NewFileListing = ({ imei, setLoaded }) => {
    
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                File Listing
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <iframe
            src={url + "/fileList"}
            style={{ width: "96%", height: "80vh", marginLeft: 24 }}
          />
        </div>
      </div>

      
        
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700"}>
                File Status
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
        </div>
             <FileStatus imei={imei} />
      </div>
    </>
  );
};

export default NewFileListing;
