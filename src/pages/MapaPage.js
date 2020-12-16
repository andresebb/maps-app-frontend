import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
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

  const { socket } = useContext(SocketContext);

  //Nuevo marcador datos
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      socket.emit("marcador-nuevo", marcador);
    });
  }, [nuevoMarcador$]);

  //Movimiento marcador datos
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {});
  }, [movimientoMarcador$]);

  //Escuchar nuevos marcadores
  useEffect(() => {
    socket.on("marcador-nuevo", (marcador) => {
      console.log(marcador);
    });
  }, []);

  //Escuchar marcadores activos
  useEffect(() => {
    socket.on("marcadores-activos", (marcadores) => {
      console.log(marcadores);
    });
  }, []);

  return (
    <>
      <div className="info">
        long {cordenadas.lng} | lat {cordenadas.lat} | zoom {cordenadas.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
