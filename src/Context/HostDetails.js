

import React, { createContext, useState } from "react";

export const Host_id = createContext();

export const HostId = ({ children }) => {
  const [hostid, setHostid] = useState("");

  // Function to update hostid
  const updateHostid = (newHostid) => {
    setHostid(newHostid);
  };

  return (
    <Host_id.Provider value={{ hostid, updateHostid }}>
      {children}
    </Host_id.Provider>
  );
};
