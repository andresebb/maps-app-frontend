import React from "react";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -70.2621,
  lat: 8.6206,
  zoom: 15,
};

export const MapaPage = () => {
  const { setRef, cordenadas } = useMapbox(puntoInicial);

  return (
    <>
      <div className="info">
        long {cordenadas.lng} | lat {cordenadas.lat} | zoom {cordenadas.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
