import { useStore } from "@store/index";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import shallow from "zustand/shallow";
import Button from "../Base/Button";
import Geocoding from "./Geocoding";

const PathfindPanel = () => {
  const {
    center,
    startPos,
    setStartPos,
    endPos,
    setEndPos,
    showStartEnd,
    setShowStartEnd,
    showGradient,
    setShowGradient,
    showWeatherproof,
    setShowWeatherproof,
    showWheelchair,
    setShowWheelchair,
    pathfindResponse,
  } = useStore(
    (state) => ({
      center: state.center,
      startPos: state.startPos,
      setStartPos: state.setStartPos,
      endPos: state.endPos,
      setEndPos: state.setEndPos,
      showStartEnd: state.showStartEnd,
      setShowStartEnd: state.setShowStartEnd,
      showGradient: state.showGradient,
      setShowGradient: state.setShowGradient,
      showWeatherproof: state.showWeatherproof,
      setShowWeatherproof: state.setShowWeatherproof,
      showWheelchair: state.showWheelchair,
      setShowWheelchair: state.setShowWheelchair,
      pathfindResponse: state.pathfindResponse,
    }),
    shallow
  );

  const router = useRouter();
  const { start, end } = router.query;

  useEffect(() => {
    if (typeof start === "string" && typeof end === "string") {
      setStartPos([
        parseFloat(start.split(",")[0]),
        parseFloat(start.split(",")[1]),
      ]);
      setEndPos([parseFloat(end.split(",")[0]), parseFloat(end.split(",")[1])]);
      setShowStartEnd(true);
      router.replace(router.pathname);
    }
  }, [start, end, setStartPos, setEndPos, setShowStartEnd, router]);

  const shareUrl = useMemo(
    () =>
      `${window.location.origin}/?start=${startPos[0]},${startPos[1]}&end=${endPos[0]},${endPos[1]}`,
    [startPos, endPos]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium">Pathfind</span>
      </div>

      <Button
        onClick={() => {
          if (!showStartEnd) {
            setStartPos(center);
            setEndPos(center);
          }
          setShowStartEnd(!showStartEnd);
        }}
      >
        Toggle <span className="text-red-500">Start</span>/
        <span className="text-green-500">End</span> Marker
      </Button>

      {/* -------------------------------- Geocoding ------------------------------- */}
      <Geocoding />

      {/* ---------------------------------- Share --------------------------------- */}
      <span className="text-lg font-medium">Share</span>
      <input
        readOnly
        value={shareUrl}
        className="rounded-md border-[1px] border-neutral-200 py-1 px-2"
      />

      {/* -------------------------------- Map types ------------------------------- */}
      <span className="text-lg font-medium">Map Types</span>
      <Button>
        <label
          htmlFor="weatherproof"
          className="flex cursor-pointer items-center justify-center gap-4"
        >
          <span>Toggle Weatherproof Map</span>

          <input
            id="weatherproof"
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            checked={showWeatherproof}
            onChange={() => {
              setShowWeatherproof(!showWeatherproof);
              setShowGradient(false);
              setShowWheelchair(false);
            }}
          />
        </label>
      </Button>
      <Button>
        <label
          htmlFor="wheelchair"
          className="flex cursor-pointer items-center justify-center gap-4"
        >
          <span>Toggle Wheelchair Map</span>

          <input
            id="wheelchair"
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            checked={showWheelchair}
            onChange={() => {
              setShowWheelchair(!showWheelchair);
              setShowGradient(false);
              setShowWeatherproof(false);
            }}
          />
        </label>
      </Button>
      <Button>
        <label
          htmlFor="gradient"
          className="flex cursor-pointer items-center justify-center gap-4"
        >
          <span>Toggle Gradient Map</span>

          <input
            id="gradient"
            type="checkbox"
            className="h-4 w-4 cursor-pointer"
            checked={showGradient}
            onChange={() => {
              setShowGradient(!showGradient);
              setShowWeatherproof(false);
              setShowWheelchair(false);
            }}
          />
        </label>
      </Button>

      {/* --------------------------- Pathfinding result --------------------------- */}
      {pathfindResponse &&
        pathfindResponse.distance &&
        pathfindResponse.result &&
        showStartEnd && (
          <div className="w-full">
            <span className="text-xl font-medium">Result</span>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1">Distance</td>
                  <td className="py-1 text-right">
                    {pathfindResponse.distance.toFixed(2)} m
                  </td>
                </tr>
                <tr>
                  <td className="py-1">ETA (Walking, 1.35 m/s)</td>
                  <td className="py-1 text-right">
                    {(pathfindResponse.distance / 1.35 / 60).toFixed(2)} min
                  </td>
                </tr>
                <tr>
                  <td className="py-1">ETA (Running, 2 m/s)</td>
                  <td className="py-1 text-right">
                    {(pathfindResponse.distance / 2 / 60).toFixed(2)} min
                  </td>
                </tr>
                <tr>
                  <td className="py-1">ETA (Wheelchair, 1.8 m/s)</td>
                  <td className="py-1 text-right">
                    {(pathfindResponse.distance / 1.8 / 60).toFixed(2)} min
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default PathfindPanel;
