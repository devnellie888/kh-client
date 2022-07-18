import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

import Dashboard from "views/admin/Dashboard.js";// default dashboard
import GetDevices from "views/admin/Devices/GetDevices";//uncommet for devices
import Index from "views/admin/Devices/IMEI/Index";//uncomment after import IMEI for trash and devies
import Trash from "views/admin/Trash/Trash.js";//for all trash


export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          {(() => {
            var url_string = window.location.href;
            var url = new URL(url_string);
            if (url.pathname.length === 15 || url.pathname.length === 14) {
              return <HeaderStats />;
            }
          })()}
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/**for devices */}
            {/**uncommet below two lines */}
            <Route path="/admin/devices" exact component={GetDevices} />
            {/** for uncomment if you want devices data */}
            <Route path="/admin/devices/:imei" exact component={Index} />
            {/**for trash devices */}
            <Route path="/admin/trash" exact component={Trash} />
            {/** uncomment after import  Index  for trash only*/}
            <Route path="/admin/trash/:imei" exact component={Index} />
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
