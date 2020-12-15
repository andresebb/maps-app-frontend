import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hpZ3VpcmVjb2RlIiwiYSI6ImNraXEyazBjNTBhYzUyc2xyb2kweno1eGcifQ.j8cpfzTNCCIdcDRXl5xz9w";

const puntoInicial = {
  lng: -70.2621,
  lat: 8.6206,
  zoom: 15,
};

export const MapaPage = () => {
  const mapaDiv = useRef();

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

    console.log(mapa.current);
  }, []);

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

  return (
    <>
      <div className="info">
        long {cordenadas.lng} | lat {cordenadas.lat} | zoom {cordenadas.zoom}
      </div>
      <div ref={mapaDiv} className="mapContainer" />
    </>
  );
};
