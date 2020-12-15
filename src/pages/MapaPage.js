import React, { useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -70.2621,
  lat: 8.6206,
  zoom: 15,
};

export const MapaPage = () => {
  const { setRef, cordenadas, nuevoMarcador$, movimientoMarcador$ } = useMapbox(
    puntoInicial
  );

  //Nuevo marcador datos
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [nuevoMarcador$]);

  //Movimiento marcador datos
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [movimientoMarcador$]);

  return (
    <>
      <div className="info">
        long {cordenadas.lng} | lat {cordenadas.lat} | zoom {cordenadas.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
