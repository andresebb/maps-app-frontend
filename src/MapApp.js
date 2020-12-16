import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { MapaPage } from "./pages/MapaPage";

const mapApp = () => {
  return (
    <>
      <SocketProvider>
        <MapaPage />
      </SocketProvider>
    </>
  );
};

export default mapApp;
