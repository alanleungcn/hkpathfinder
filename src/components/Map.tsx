import { useStore } from "@store/index";
import { getFeatureStyle } from "@utils/getFeatureStyle";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  ZoomControl,
  LayersControl,
  Marker,
  LayerGroup,
  Tooltip,
} from "react-leaflet";
import shallow from "zustand/shallow";
import mapTileDict from "@common/mapTile.json";
import bonaqua from "../../data/bonaqua.json";
import L from "leaflet";
import Pathfind from "./Pathfind";
import { VectorGrid } from "./VectorGrid";

const MapEventListener = () => {
  const { setZoomLevel, setCenter, setMapTile } = useStore(
    (state) => ({
      setZoomLevel: state.setZoomLevel,
      setCenter: state.setCenter,
      setMapTile: state.setMapTile,
    }),
    shallow
  );

  const map = useMapEvents({
    baselayerchange: (e) => setMapTile(e.name),
    dragend: () => setCenter([map.getCenter().lat, map.getCenter().lng]),
    zoomend: () => setZoomLevel(map.getZoom()),
  });

  return null;
};

const Map = () => {
  const { center, mapTile, zoomLevel, showBonaqua, setShowBonaqua } = useStore(
    (state) => ({
      center: state.center,
      mapTile: state.mapTile,
      zoomLevel: state.zoomLevel,
      showBonaqua: state.showBonaqua,
      setShowBonaqua: state.setShowBonaqua,
    }),
    shallow
  );

  return (
    <MapContainer
      preferCanvas
      center={center}
      zoom={zoomLevel}
      className="h-full"
      zoomControl={false}
      attributionControl={false}
    >
      <LayersControl position="bottomleft">
        {/* -------------------------------- Map tile -------------------------------- */}
        {Object.entries(mapTileDict).map(([k, v]) => (
          <LayersControl.BaseLayer key={k} name={k} checked={mapTile === k}>
            <TileLayer url={v} maxZoom={20} />
          </LayersControl.BaseLayer>
        ))}

        {/* --------------------------------- Bonaqua -------------------------------- */}
        <LayersControl.Overlay
          name="Bonaqua Water Stations"
          checked={showBonaqua}
        >
          <LayerGroup
            eventHandlers={{
              add: () => setShowBonaqua(true),
              remove: () => setShowBonaqua(false),
            }}
          >
            {bonaqua.map(({ latitude, longitude, fullAddress }, i) => (
              <Marker
                key={i}
                position={[latitude, longitude]}
                icon={L.icon({
                  iconUrl: "images/bonaqua.png",
                  iconSize: [32, 36.8],
                  iconAnchor: [16, 36.8],
                })}
              >
                <Tooltip>{fullAddress}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* ------------------------------ Zoom control ------------------------------ */}
      <ZoomControl position="bottomright" />

      {/* ----------------------------- Event listener ----------------------------- */}
      <MapEventListener />

      {/* ------------------------------- Pathfinding ------------------------------ */}
      <Pathfind />

      {/* --------------------------- GeoJSON vector grid -------------------------- */}
      <VectorGrid />
    </MapContainer>
  );
};

export default Map;
