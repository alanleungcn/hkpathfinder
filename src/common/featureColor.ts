import { FeatureType } from "./types";

export const featureColor: { [key in FeatureType]: string } = {
  /* ----------------------------- General walkway ---------------------------- */
  Footway: "#cccccc",
  Footpath: "#cccccc",
  M_Footway: "#cccccc",
  "Service Lane": "#cccccc",
  "Generalized Walkway Inside Park": "#cccccc",
  /* ---------------------------------- Stair --------------------------------- */
  Staircase: "#888888",
  M_Staircase: "#888888",
  /* --------------------------------- Bridge --------------------------------- */
  Footbridge: "#5fa4f4",
  /* --------------------------------- Subway --------------------------------- */
  Subway: "#209e23",
  /* ---------------------------------- Ramp ---------------------------------- */
  Ramp: "#ff6c00",
  M_Ramp: "#ff6c00",
  /* -------------------------------- Escalator ------------------------------- */
  Escalator: "#f31dd9",
  Travelator: "#f31dd9",
  M_Escalator: "#f31dd9",
  M_Travelator: "#f31dd9",
  /* ---------------------------------- Lift ---------------------------------- */
  Lift: "#16d0d7",
  M_Lift: "#16d0d7",
  M_stairlift: "#16d0d7",
  /* -------------------------------- Crossing -------------------------------- */
  RunIn: "#bdf112",
  "Traffic Island": "#e5f112",
  "Crossing - Zebra": "#e5f112",
  "Crossing - Others": "#e5f112",
  "Crossing - Cautionary": "#e5f112",
  "Crossing - Signalized": "#e5f112",
  /* ---------------------------------- Other --------------------------------- */
  Track: "#957c54",
  Other: "#957c54",
  M_Others: "#957c54",
  Village: "#957c54",
};
