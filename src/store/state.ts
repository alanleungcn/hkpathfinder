import { FeatureType, PathfindResponse } from "@common/types";
import { StateCreator } from "zustand";
import { PropertiesSlice } from "./properties";

export interface StateSlice {
  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
  center: [number, number];
  setCenter: (center: [number, number]) => void;
  showPanel: boolean;
  setShowPanel: (showPanel: boolean) => void;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  legend: { [key in FeatureType]: boolean };
  setLegend: (legend: FeatureType, value: boolean) => void;
  toggleAllLegend: (value: boolean) => void;
  mapTile: string;
  setMapTile: (mapTile: string) => void;
  showStartEnd: boolean;
  setShowStartEnd: (showStartEnd: boolean) => void;
  startPos: [number, number];
  setStartPos: (startPos: [number, number]) => void;
  endPos: [number, number];
  setEndPos: (endPos: [number, number]) => void;
  showGradient: boolean;
  setShowGradient: (showGradient: boolean) => void;
  showWeatherproof: boolean;
  setShowWeatherproof: (showWeatherproof: boolean) => void;
  showWheelchair: boolean;
  setShowWheelchair: (showWheelchair: boolean) => void;
  showBonaqua: boolean;
  setShowBonaqua: (showBonaqua: boolean) => void;
  pathfindResponse: PathfindResponse | null;
  setPathfindResponse: (pathfindResponse: PathfindResponse | null) => void;
}

export const createStateSlice: StateCreator<
  PropertiesSlice & StateSlice,
  [
    ["zustand/persist", unknown],
    ["zustand/immer", never],
    ["zustand/devtools", never]
  ],
  [],
  StateSlice
> = (set) => ({
  zoomLevel: 12,
  setZoomLevel: (zoomLevel: number) =>
    set((state) => {
      state.zoomLevel = zoomLevel;
    }),
  center: [22.320532554821575, 114.16871827698724],
  setCenter: (center: [number, number]) =>
    set((state) => {
      state.center = center;
    }),
  showPanel: true,
  setShowPanel: (showPanel: boolean) =>
    set((state) => {
      state.showPanel = showPanel;
    }),
  tabIndex: 0,
  setTabIndex: (tabIndex: number) =>
    set((state) => {
      state.tabIndex = tabIndex;
    }),
  legend: {
    Footway: true,
    Footpath: true,
    M_Footway: true,
    "Service Lane": true,
    "Generalized Walkway Inside Park": true,
    Staircase: true,
    M_Staircase: true,
    Footbridge: true,
    Subway: true,
    Ramp: true,
    M_Ramp: true,
    Escalator: true,
    Travelator: true,
    M_Escalator: true,
    M_Travelator: true,
    Lift: true,
    M_Lift: true,
    M_stairlift: true,
    RunIn: true,
    "Traffic Island": true,
    "Crossing - Zebra": true,
    "Crossing - Others": true,
    "Crossing - Cautionary": true,
    "Crossing - Signalized": true,
    Track: true,
    Other: true,
    M_Others: true,
    Village: true,
  },
  setLegend: (legend: FeatureType, value) =>
    set((state) => {
      state.legend[legend] = value;
    }),
  toggleAllLegend: (value: boolean) =>
    set((state) => {
      for (const key in state.legend) {
        state.legend[key as FeatureType] = value;
      }
    }),
  mapTile: "Stadia OSM Bright",
  setMapTile: (mapTile: string) =>
    set((state) => {
      state.mapTile = mapTile;
    }),
  showStartEnd: false,
  setShowStartEnd: (showStartEnd: boolean) =>
    set((state) => {
      state.showStartEnd = showStartEnd;
    }),
  startPos: [22.320532554821575, 114.16871827698724],
  setStartPos: (startPos: [number, number]) =>
    set((state) => {
      state.startPos = startPos;
    }),
  endPos: [22.320532554821575, 114.16871827698724],
  setEndPos: (endPos: [number, number]) =>
    set((state) => {
      state.endPos = endPos;
    }),
  showGradient: false,
  setShowGradient: (showGradient: boolean) =>
    set((state) => {
      state.showGradient = showGradient;
    }),
  showWeatherproof: false,
  setShowWeatherproof: (showWeatherproof: boolean) =>
    set((state) => {
      state.showWeatherproof = showWeatherproof;
    }),
  showWheelchair: false,
  setShowWheelchair: (showWheelchair: boolean) =>
    set((state) => {
      state.showWheelchair = showWheelchair;
    }),
  showBonaqua: false,
  setShowBonaqua: (showBonaqua: boolean) =>
    set((state) => {
      state.showBonaqua = showBonaqua;
    }),
  pathfindResponse: null,
  setPathfindResponse: (pathfindResponse: PathfindResponse | null) =>
    set((state) => {
      state.pathfindResponse = pathfindResponse;
    }),
});
