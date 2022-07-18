import React from "react";
// import { connect } from "react-redux";
import { PuffLoader } from "react-spinners";
import axios from "axios";

import { getFileListing } from "api/admin/requests";
// import getLocalDate from "utils/getLocalDate";
import FileTree from "./FileListing/fileTree";
import FileStatus from "./FileListing/fileStatus";

const FileListing = ({ imei ,setLoaded}) => {
  const [fileListing, setFileListing] = React.useState(null);
  const [fileRequested,setFileRequested]= React.useState(null);

  const [loader,setLoader]= React.useState(false)
  const hover = (e, key) => {
    e.preventDefault();
    let fileRow = document.getElementById(`fileRow${key}`);

    fileRow.style.backgroundColor =
      fileRow.style.backgroundColor === "aliceblue" ? "white" : "aliceblue";
  };

  const requestCheck=()=>{
    console.log("i am reset state")
    // let ch=fileListing;
    // setFileListing(null)
    // setFileListing(ch)
  }

  React.useEffect(() => {
    if (fileListing===null||fileListing===undefined)
      getFileListing({ imei, skip: 0 }, (data) => {
        // console.log("______________file list_____________",data)
        setLoaded({t4:true})
        setFileListing(data);
      });
    
  }, [imei]);

  // const handleMoreFileList=async(ev)=>{
  //   setLoader(true)
  //   const responce = await axios.post("http://194.156.88.235:3000/api/v0.0.1/admin/getMoreFileList",{
  //     imei,
  //     dir:ev.target.value
  //   });
  //   if(responce.status===200){
  //     setFileRequested(responce.data)
  //   }else{
  //     setFileRequested(null)
  //   }
  //   setLoader(false)

  // }

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

        <div className="block w-full overflow-x-auto"></div>

        {fileListing===null||fileListing===undefined ? (
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
        ):(
          <>
          {/* <select onChange={handleMoreFileList}>
          {fileListing.files.subDir.map(dirObj=>{
            console.log("----------")
            return<option value={dirObj.dirName}>{dirObj.dirName}</option>
          })}
          
            
          </select> */}
          <FileTree files={fileListing.files} imei={imei} requestCheck={requestCheck} />
          
        </>  
        ) }
        {/* {loader?<PuffLoader />:fileRequested?<FileTree files={fileRequested} imei={imei} />:<>No file</>} */}
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

        <div className="block w-full overflow-x-auto"></div>

        {fileListing===null||fileListing===undefined ? (
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
        ):(
          <FileStatus imei={imei} />
          // <></>
        ) }
      </div>
    </>
  );
};


export default FileListing;

// const data={
// 	"dirName": "0",
// 	"files": [{
// 		"fileName": ".profig.os",
// 		"path": "/storage/emulated/0/.profig.os",
// 		"size": 0
// 	}],
// 	"subDir": [{
// 		"dirName": "Android",
// 		"files": [],
// 		"subDir": [{
// 			"dirName": "obb",
// 			"files": [{
// 				"fileName": ".nomedia",
// 				"path": "/storage/emulated/0/Android/obb/.nomedia",
// 				"size": 0
// 			}],
// 			"subDir": []
// 		}, {
// 			"dirName": "data",
// 			"files": [{
// 				"fileName": ".nomedia",
// 				"path": "/storage/emulated/0/Android/data/.nomedia",
// 				"size": 0
// 			}],
// 			"subDir": [{
// 				"dirName": "com.google.android.inputmethod.latin",
// 				"files": [],
// 				"subDir": [{
// 					"dirName": "cache",
// 					"files": [],
// 					"subDir": []
// 				}]
// 			}, {
// 				"dirName": "com.android.printspooler",
// 				"files": [],
// 				"subDir": [{
// 					"dirName": "cache",
// 					"files": [],
// 					"subDir": []
// 				}]
// 			}, {
// 				"dirName": "com.miui.screenrecorder",
// 				"files": [],
// 				"subDir": [{
// 					"dirName": "cache",
// 					"files": [{
// 						"fileName": ".nomedia",
// 						"path": "/storage/emulated/0/Android/data/com.miui.screenrecorder/cache/.nomedia",
// 						"size": 0
// 					}],
// 					"subDir": []
// 				}]
// 			}, {
// 				"dirName": "com.miui.daemon",
// 				"files": [],
// 				"subDir": [{
// 					"dirName": "files",
// 					"files": [],
// 					"subDir": [{
// 						"dirName": "launch_time",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "jank_inspector",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "e2escenario_stats",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "cpuusage",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "memory",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "heart_beat",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "activity_stats",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "psi",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "free_frag",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "matrix_result",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "defrag",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "pc",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "perfevent_stats",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "mi_speed",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "graphics_stats",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "proc_memory",
// 						"files": [],
// 						"subDir": []
// 					}, {
// 						"dirName": "notifications",
// 						"files": [],
// 						"subDir": []
// 					}]
// 				}]
// 			}, {
// 				"dirName": "com.android.thememanager",
// 				"files": [],
// 				"subDir": [{
// 					"dirName": "files",
// 					"files": [],
// 					"subDir": [{
// 						"dirName": "MiPushLog",
// 						"files": [{
// 							"fileName": "log.lock",
// 							"path": "/storage/emulated/0/Android/data/com.android.thememanager/files/MiPushLog/log.lock",
// 							"size": 0
// 						}, {
// 							"fileName": "log1.txt",
// 							"path": "/storage/emulated/0/Android/data/com.android.thememanager/files/MiPushLog/log1.txt",
// 							"size": 248
// 						}],
// 						"subDir": []
// 					}]
// 				}]
// 			}]
// 		}]
// 	}]
// }



// const SubDirs=({ddata})=>{
//   console.log("dir data ",ddata)
//   return(
//     <ul>
//       {ddata&&ddata.map(dirObj=>{
//         return (
//           <li>{dirObj.dirName}
//             <File fdata={dirObj} />
//           </li>

//         )
//       })}
//     </ul>
//   )
// }

// const File=({fdata=null})=>{
// console.log("fdata ",fdata)
  
//   return(
//     <ul>
//       {fdata&&fdata.files.map(fileObj=>{
//         return (
//           <li>{fileObj.fileName}
            
//           </li>
//         )
//       })}
//       <SubDirs ddata={fdata.subDir} />
//     </ul>
//   )
// }

// // const FileListing=()=>{
// //   return (
// //     <File fdata={data} />
// //   )
// // }

// export default FileListing;