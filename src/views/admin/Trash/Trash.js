import React from "react";
import TrashedDevices from "views/admin/Trash/TrashedDevices";

const Trash = () => {

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TrashedDevices />
        </div>
      </div>
    </>
  );
};

export default Trash;
