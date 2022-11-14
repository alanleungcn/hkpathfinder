import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
// @ts-ignore
import { antPath } from "leaflet-ant-path";

const Path = ({ positions }: { positions: [number, number][] }) => {
  const map = useMap();

  const path = useMemo(() => {
    const options = {
      weight: 4,
      delay: 8000,
      opacity: 0.8,
      dashArray: [16],
      color: "#ff0000",
      interactive: false,
      pulseColor: "#ffffff",
    };

    return antPath(positions, options);
  }, [positions]);

  useEffect(() => {
    path.addTo(map);

    return () => {
      map.removeLayer(path);
    };
  }, [map, path]);

  return null;
};

export default Path;
