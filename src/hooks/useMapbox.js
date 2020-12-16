import { useState, useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hpZ3VpcmVjb2RlIiwiYSI6ImNraXEyazBjNTBhYzUyc2xyb2kweno1eGcifQ.j8cpfzTNCCIdcDRXl5xz9w";

export const useMapbox = (puntoInicial) => {
  //Referencia al div del map, setRef es lo mismo que mapaDiv solo que memorizado
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);

  // Referencia a los marcadores
  const marcadores = useRef({});

  //Observables de Rxjs
  const movimientoMarcador = useRef(new Subject());
  const nuevoMarcador = useRef(new Subject());

  //Mapa y cordenadas
  const mapa = useRef();
  const [cordenadas, setCordenadas] = useState(puntoInicial);

  //Agregar marcadores
  const agregarMarcador = useCallback((ev, id) => {
    const { lng, lat } = ev.lngLat || ev;

    const marker = new mapboxgl.Marker();
    //Si el id no viene usa uuid.
    marker.id = id ?? v4();

    marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

    //Asignamoes el objeto al marcador
    marcadores.current[marker.id] = marker;

    //Si no viene el id no se emite el nuevoMarcador
    if (!id) {
      nuevoMarcador.current.next({
        id: marker.id,
        lng,
        lat,
      });
    }

    //Escuchar movimientos al marcador
    marker.on("drag", (ev) => {
      const { id } = ev.target;
      const { lng, lat } = ev.target.getLngLat();

      movimientoMarcador.current.next({
        id,
        lng,
        lat,
      });
    });
  }, []);

  // Cargamos el mapa
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    //Zoom en el mapa
    map.addControl(new mapboxgl.NavigationControl());

    // Marcador por defecto en el mapa
    var marker = new mapboxgl.Marker()
      .setLngLat([cordenadas.lng, cordenadas.lat])
      .addTo(map)
      .setDraggable(true);

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
  }, []);

  // Crear nuevo marcador
  useEffect(() => {
    mapa.current?.on("click", (ev) => {
      agregarMarcador(ev);
    });
  }, [agregarMarcador]);

  return {
    cordenadas,
    agregarMarcador,
    marcadores,
    setRef,
    nuevoMarcador$: nuevoMarcador.current,
    movimientoMarcador$: movimientoMarcador.current,
  };
};
