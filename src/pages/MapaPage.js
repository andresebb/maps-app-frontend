import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -70.2621,
  lat: 8.6206,
  zoom: 15,
};

export const MapaPage = () => {
  const {
    setRef,
    cordenadas,
    nuevoMarcador$,
    movimientoMarcador$,
    agregarMarcador,
  } = useMapbox(puntoInicial);

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
      agregarMarcador(marcador, marcador.id);
    });
  }, [socket, agregarMarcador]);

  //Escuchar marcadores activos
  useEffect(() => {
    socket.on("marcadores-activos", (marcadores) => {
      //Barrer las keys de un objeto, es como un map
      for (const key of Object.keys(marcadores)) {
        // console.log(marcadores[key]);
        agregarMarcador(marcadores[key], key);
      }
    });
  }, [socket, agregarMarcador]);

  return (
    <>
      <div className="info">
        long {cordenadas.lng} | lat {cordenadas.lat} | zoom {cordenadas.zoom}
      </div>
      <div ref={setRef} className="mapContainer" />
    </>
  );
};
