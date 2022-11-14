import { PathfindResponse } from "@common/types";
import { useStore } from "@store/index";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import shallow from "zustand/shallow";
import "leaflet-spin";
import Path from "./Path";

const lightSpinnerOptions = {
  lines: 10,
  length: 15,
  radius: 20,
  scale: 0.5,
  corners: 1,
};

const darkSpinnerOptions = {
  lines: 10,
  length: 15,
  radius: 20,
  scale: 0.5,
  corners: 1,
  color: "#ffffff",
};

const DraggableStartEnd = () => {
  const { startPos, endPos, setStartPos, setEndPos } = useStore(
    (state) => ({
      startPos: state.startPos,
      endPos: state.endPos,
      setStartPos: state.setStartPos,
      setEndPos: state.setEndPos,
    }),
    shallow
  );

  const startRef = useRef<L.Marker<any>>(null);
  const endRef = useRef<L.Marker<any>>(null);

  const startEventHandlers = useMemo(
    () => ({
      dragend() {
        const start = startRef.current;
        if (start != null)
          setStartPos([start.getLatLng().lat, start.getLatLng().lng]);
      },
    }),
    [setStartPos]
  );

  const endEventHandlers = useMemo(
    () => ({
      dragend() {
        const end = endRef.current;
        if (end != null) setEndPos([end.getLatLng().lat, end.getLatLng().lng]);
      },
    }),
    [setEndPos]
  );

  return (
    <>
      <Marker
        draggable
        ref={startRef}
        position={startPos}
        eventHandlers={startEventHandlers}
        icon={L.icon({
          iconUrl: "images/pin_red.svg",
          iconSize: [25, 40],
          iconAnchor: [12.5, 40],
        })}
      />

      <Marker
        draggable
        ref={endRef}
        position={endPos}
        eventHandlers={endEventHandlers}
        icon={L.icon({
          iconUrl: "images/pin_blue.svg",
          iconSize: [25, 40],
          iconAnchor: [12.5, 40],
        })}
      />
    </>
  );
};

const Pathfind = () => {
  const {
    showStartEnd,
    startPos,
    endPos,
    mapTile,
    showWeatherproof,
    showWheelchair,
    pathfindResponse,
    setPathfindResponse,
  } = useStore(
    (state) => ({
      showStartEnd: state.showStartEnd,
      startPos: state.startPos,
      endPos: state.endPos,
      mapTile: state.mapTile,
      showWeatherproof: state.showWeatherproof,
      showWheelchair: state.showWheelchair,
      pathfindResponse: state.pathfindResponse,
      setPathfindResponse: state.setPathfindResponse,
    }),
    shallow
  );

  const map = useMap();

  // const [path, setPath] = useState<[number, number][] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPath = async () => {
      setLoading(true);
      // @ts-ignore
      map.spin(
        true,
        ["Stadia Alidade Smooth Dark", "CartoDB DarkMatter"].includes(mapTile)
          ? darkSpinnerOptions
          : lightSpinnerOptions
      );

      const res = await fetch(`/api/pathfind`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startPos,
          endPos,
          mode: showWheelchair
            ? "wheelchair"
            : showWeatherproof
            ? "weatherproof"
            : null,
        }),
      });
      const resJson: PathfindResponse = await res.json();

      if (!resJson.startVertice || !resJson.endVertice || !resJson.result) {
        // setPath(null);
        setPathfindResponse(null);
        // @ts-ignore
        map.spin(false);
        alert("No path found");
        return;
      }
      // setPath([startPos, ...resJson.result.path, endPos]);
      setPathfindResponse(resJson);

      setLoading(false);
      // @ts-ignore
      map.spin(false);
    };

    if (!showStartEnd || !startPos || !endPos) return;
    getPath();
  }, [
    showStartEnd,
    startPos,
    endPos,
    map,
    mapTile,
    showWeatherproof,
    showWheelchair,
    setPathfindResponse,
  ]);

  return (
    <>
      {showStartEnd && (
        <>
          <DraggableStartEnd />

          {pathfindResponse?.result?.path && !loading && (
            // <Polyline
            //   weight={5}
            //   color="#ff0000"
            //   positions={pathfindResponse.result.path}
            //   dashArray={[10]}
            //   // interactive={false}
            // />
            <Path positions={pathfindResponse.result.path} />
          )}
        </>
      )}
    </>
  );
};

export default Pathfind;
