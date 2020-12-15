import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hpZ3VpcmVjb2RlIiwiYSI6ImNraXEyazBjNTBhYzUyc2xyb2kweno1eGcifQ.j8cpfzTNCCIdcDRXl5xz9w";

const puntoInicial = {
  lng: -70.26212021970849,
  lat: 8.620686980291502,
  zoom: 15,
};

export const MapaPage = () => {
  const mapaDiv = useRef();

  const [mapa, setMapa] = useState();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    setMapa(map);
  }, []);

  return (
    <>
      <div ref={mapaDiv} className="mapContainer" />
    </>
  );
};
