import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.vectorgrid";
import pedestrianNetwork from "../../data/extracted_pedestrian_network.json";
import { getFeatureStyle } from "@utils/getFeatureStyle";
import shallow from "zustand/shallow";
import { useStore } from "@store/index";
import {
  PedestrianNetworkFeature,
  PedestrianNetworkProperties,
} from "@common/types";
import { useMap } from "react-leaflet";

const vectorTileLayerStyles = {
  sliced: (properties: PedestrianNetworkProperties, zoom: number) =>
    getFeatureStyle(properties, zoom),
};

export const VectorGrid = () => {
  const {
    legend,
    showGradient,
    showWeatherproof,
    showWheelchair,
    mapTile,
    properties,
    showProperties,
    setProperties,
    setShowProperties,
    setTabIndex,
  } = useStore(
    (state) => ({
      legend: state.legend,
      showWeatherproof: state.showWeatherproof,
      properties: state.properties,
      showProperties: state.showProperties,
      showGradient: state.showGradient,
      showWheelchair: state.showWheelchair,
      mapTile: state.mapTile,
      setProperties: state.setProperties,
      setShowProperties: state.setShowProperties,
      setTabIndex: state.setTabIndex,
    }),
    shallow
  );
  const map = useMap();

  const vectorGrid = useMemo(() => {
    const options = {
      maxZoom: 20,
      interactive: true,
      vectorTileLayerStyles,
      // @ts-ignore
      rendererFactory: L.canvas.tile,
      getFeatureId: (feature: PedestrianNetworkFeature) => {
        return feature.properties.OBJECTID;
      },
    };

    // @ts-ignore
    return L.vectorGrid.slicer(pedestrianNetwork, options);
  }, []);

  vectorGrid.on("click", (e: any) => {
    // Update previous style
    if (properties)
      vectorGrid.setFeatureStyle(
        properties.OBJECTID,
        vectorGrid.options.vectorTileLayerStyles["sliced"]
      );
    // Update current style
    vectorGrid.setFeatureStyle(
      e.layer.properties.OBJECTID,
      vectorGrid.options.vectorTileLayerStyles["sliced"]
    );

    setProperties(e.layer.properties);
    setShowProperties(true);
    setTabIndex(1);
  });

  useEffect(() => {
    // Dirty fix for clearing selection
    if (!showProperties) vectorGrid.redraw();
  }, [vectorGrid, showProperties]);

  useEffect(() => {
    vectorGrid.redraw();
  }, [vectorGrid, legend, showGradient, showWeatherproof, showWheelchair]);

  // Bring vector grid to front when switching base layer
  useEffect(() => {
    vectorGrid.bringToFront();
  }, [vectorGrid, mapTile]);

  useEffect(() => {
    map.addLayer(vectorGrid);
    vectorGrid.bringToFront();

    // Dirty fix for fakeStop undefined error
    // @ts-ignore
    L.DomEvent.fakeStop = () => {
      return true;
    };
    return () => {
      map.removeLayer(vectorGrid);
    };
  }, [map, vectorGrid]);

  return null;
};
