import React, { useState, useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hpZ3VpcmVjb2RlIiwiYSI6ImNraXEyazBjNTBhYzUyc2xyb2kweno1eGcifQ.j8cpfzTNCCIdcDRXl5xz9w";

export const useMapbox = (puntoInicial) => {
  //Referencia al div del map, setRef es lo mismo que mapaDiv solo que memorizado
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);

  const mapa = useRef();
  const [cordenadas, setCordenadas] = useState(puntoInicial);

  // Cargamos el mapa
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([cordenadas.lng, cordenadas.lat])
      .addTo(map);

    mapa.current = map;
  }, [puntoInicial]);

  // Cuando se mueve el mapa
  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current.getCenter();
      setCordenadas({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });

    // return mapa.current?.off("move");
  }, []);

  return {
    cordenadas,
    setRef,
  };
};
