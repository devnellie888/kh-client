import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";
import {
  AiOutlineFileText,
  AiFillFolder,
  AiFillFolderOpen,
} from "react-icons/ai";


import { getFile, getDeviceInfoX, getFiles } from "api/admin/requests";
import { DataContext } from "index";

const StyledTree = styled.div`
  line-height: 1.5;
`;
const StyledFile = styled.div`
  padding-left: 20px;
  font-size: 16px;
  color: #633c60;
  cursor: pointer;
  .file--label {
    display: flex;
    padding: 5px 0px 5px 0px;
    align-items: center;
    svg {
      height: 1.5em;
      width: 1.5em;
    }
    span {
      margin-left: 5px;
    }
    &:hover {
      background-color: #00000013;
    }
  }
`;
const StyledFolder = styled.div`
  padding-left: 20px;
  font-size: 16px;
  color: black;
  cursor: pointer;
  .folder--label {
    display: flex;
    padding: 5px 0px 5px 0px;
    align-items: center;
    svg {
      height: 1.5em;
      width: 1.5em;
    }
    span {
      margin-left: 5px;
    }
    &:hover {
      background-color: #00000013;
    }
  }
`;
const Collapsible = styled.div`
  height: ${(p) => (p.isOpen ? "auto" : "0")};
  overflow: hidden;
`;

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

let selectedFiles = [];
const handleSelect = (ev) => {
  const filePath = ev.target.id;
  if (selectedFiles.includes(filePath)) {
    const newSlectedArray = selectedFiles.filter((path) => path != filePath);
    selectedFiles = newSlectedArray;
  } else {
    selectedFiles.push(filePath);
  }
  // console.log("selected filesv ", selectedFiles);
};

const File = ({ name, size, path, imei }) => {
  const [fileAlert, setFileAlert] = React.useState(false);

  const { fileRequest, setFileRequest } = React.useContext(DataContext);

  const fetch = () => {
    getFile({ imei, path }, () => {
      setFileRequest(fileRequest + 1);
      getDeviceInfoX({ imei });
      setFileAlert(false);
    });
  };

  return (
    <>
      {fileAlert ? (
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
            onClick={() => setFileAlert(false)}
          >
            <div
              className="relative w-auto my-6 mx-auto max-w-sm"
              style={{ maxWidth: "80%" }}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Confirmation</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setFileAlert(false)}
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
                    Are you sure you want to fetch{" "}
                    <span style={{ fontWeight: "bold" }}>{path}</span>?
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
                    onClick={() => setFileAlert(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    // onClick={fetch}
                  >
                    Get File
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
      <StyledFile>
        <div
          className="file--label"
          // onClick={() => setFileAlert(true)}
        >
          <AiOutlineFileText />
          <span>{name}</span>
          <span>[{formatBytes(size * 1024)}]</span>
          <input type="checkbox" id={path} className="filecheck" style={{marginLeft:20}}  onChange={handleSelect}  />
        </div>
      </StyledFile>
    </>
  );
};

const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolder>
      <div className="folder--label" onClick={handleToggle}>
        {isOpen ? <AiFillFolderOpen /> : <AiFillFolder />}
        <span>{name}</span>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </StyledFolder>
  );
};

const TreeRecursive = ({ data, getFile, imei, getDeviceInfoX }) => {
  let count = 0;
  let structure = [data];

  return structure.map((struc) => {
    let files, dirs;

    if (struc.files && struc.files.length > 0) {
      files = struc.files.map((file) => {
        count++;

        return (
          <File
            name={file.fileName}
            key={`f_${count}`}
            size={file.size}
            path={file.path}
            getFile={getFile}
            imei={imei}
            getDeviceInfoX={getDeviceInfoX}
          />
        );
      });
    }

    if (struc.subDir && struc.subDir.length > 0) {
      dirs = struc.subDir.map((dir) => {
        count++;

        let t = (
          <Folder name={dir.dirName} key={`d_${count}`}>
            <TreeRecursive
              data={dir}
              getFile={getFile}
              imei={imei}
              getDeviceInfoX={getDeviceInfoX}
            />
          </Folder>
        );

        return t;
      });
    }

    if (dirs && files) {
      return [...dirs, ...files];
    } else if (dirs && !files) {
      return dirs;
    } else if (!dirs && files) {
      return files;
    } else {
      return null;
    }
  });
};

const Tree =React.memo (({ data, children, getFile, imei, getDeviceInfoX }) => {
  const isImparative = data && !children;
  return (
    <StyledTree>
      {isImparative ? (
        <TreeRecursive
          data={data}
          getFile={getFile}
          imei={imei}
          getDeviceInfoX={getDeviceInfoX}
        />
      ) : (
        children
      )}
    </StyledTree>
  );
});

const App = ({ files, getFile, imei,requestCheck, getDeviceInfoX }) => {
  const [loader, setLoader] = React.useState(false);
  const { fileRequest, setFileRequest } = React.useContext(DataContext);

  const handleFileRequest = () => {
    setLoader(true);
    getFiles(
      {
        filePaths: selectedFiles,
        imei,
      },
      (status) => {
        console.log("file gets",status);
        requestCheck()
        if(status){
          selectedFiles=[]
          setFileRequest(fileRequest + 1);
          alert("your request successfully excuted")
        }
        
        setLoader(false);
        // const allSelectedCheckbox =document.getElementsByClassName("filecheck");
        // console.log("size",allSelectedCheckbox.length)
        // for(let i=0; i<allSelectedCheckbox.length;i++){
        //   console.log("--",allSelectedCheckbox[0])
        //   allSelectedCheckbox[0].checked=false;
        // }
      }
    );
  };
  return (
    <div style={{ margin: "30px" }} className="App">
      <div
        style={{
          width: 110,
          float: "right",
        }}
        onClick={handleFileRequest}
      >
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
              // initiateDownload();
            }}
            data-toggle="tab"
            href="#link6"
            role="tablist"
          >
            <i className="fas fa-download text-base mr-1"></i> File Request
          </a>
        )}
      </div>
      <Tree
        data={files}
        getFile={getFile}
        imei={imei}
        getDeviceInfoX={getDeviceInfoX}
      />
    </div>
  );
};

export default App;
