// const initialState = [];

// const stateManager = (state = initialState, action) => {
//   const { type, res, imei = "" } = action;
//   switch (type) {
//     case "getDevices":
//       return [...initialState, ...res];
//     case "getDeviceInfo":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, liveInfo: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//     case "getContacts":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, contacts: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//     case "getCallLogs":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, callLogs: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//     case "getSmsLogs":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, smsLogs: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//     case "getWhatsapp":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, whatsapp: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//     case "getTelegram":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, telegram: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//     case "getSignal":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, signal: res ? res : [] }
//             : { ...device }
//         ),
//       ];

//     case "getMessanger":
//       return [
//         ...state.map((device) =>
//           device.imei === imei
//             ? { ...device, messanger: res ? res : [] }
//             : { ...device }
//         ),
//       ];
//       case "getViber":
//         return [
//           ...state.map((device) =>
//             device.imei === imei
//               ? { ...device, viber: res ? res : [] }
//               : { ...device }
//           ),
//         ];

//         case "getConion":
//           return [
//             ...state.map((device) =>
//               device.imei === imei
//                 ? { ...device, conion: res ? res : [] }
//                 : { ...device }
//             ),
//           ];

//           case "getImo":
//           return [
//             ...state.map((device) =>
//               device.imei === imei
//                 ? { ...device, imo: res ? res : [] }
//                 : { ...device }
//             ),
//           ];
//           case "getProtectedText":
//             return [
//               ...state.map((device) =>
//                 device.imei === imei
//                   ? { ...device, protectedText: res ? res : [] }
//                   : { ...device }
//               ),
//             ];
          
//     case "getFileListing":
//       return [
//         ...state.map((device) =>
//           device.imei === imei ? { ...device, fileListing: res } : { ...device }
//         ),
//       ];
//     case "getFile":
//       return [
//         ...state.map((device) =>
//           device.imei === imei ? { ...device, ...res } : { ...device }
//         ),
//       ];
//     case "cancelFile":
//       return [
//         ...state.map((device) =>
//           device.imei === imei ? { ...device, ...res } : { ...device }
//         ),
//       ];
//     case "moveToTrash":
//       return [
//         ...state.map((device) =>
//           imei.includes(device.imei)
//             ? { ...device, box: "trash" }
//             : { ...device }
//         ),
//       ];
//     case "deletePermanently":
//       return [
//         ...state.map((device) =>
//           imei.includes(device.imei)
//             ? { ...device, box: "deleted" }
//             : { ...device }
//         ),
//       ];
//     case "moveToInbox":
//       return [
//         ...state.map((device) =>
//           imei.includes(device.imei)
//             ? { ...device, box: "inbox" }
//             : { ...device }
//         ),
//       ];
//     case "error":
//       return res;
//     default:
//       return state;
//   }
// };

// export default stateManager;
