import { NearestPoint } from "@turf/nearest-point";
import GeoJson from "geojson";

export type PathfindResponse = {
  startVertice: [number, number] | null;
  endVertice: [number, number] | null;
  result: {
    path: [number, number][];
    weight: number;
    edgeDatas: { reducedEdge: PedestrianNetworkProperties }[];
  } | null;
  distance: number | null;
};

export interface PedestrianNetworkFeature {
  type: GeoJson.GeoJsonTypes;
  geometry: GeoJson.GeoJsonGeometryTypes;
  properties: PedestrianNetworkProperties;
}

export interface PedestrianNetworkProperties {
  OBJECTID: number;
  PedestrianRouteID: number;
  Location: string;
  FeatureType: FeatureType;
  AliasNameEN: string;
  AliasNameTC: string;
  CrossingFeature?: any;
  WeatherProof: string;
  WheelchairBarrier: string;
  WheelchairAccess: string;
  ObstaclesType?: any;
  Gradient: number;
  Direction: string;
  PositionCertainty: string;
  Enabled: string;
  DataSource: string;
  LevelSource: string;
  StreetNameEN: string;
  StreetNameTC: string;
  ST_CODE: number;
  FloorID?: any;
  BuildingID_1?: any;
  BuildingID_2?: any;
  SiteID?: any;
  TerminalID?: any;
  AccessTimeID?: any;
  CreationDate: string;
  ModifiedBy: string;
  LastAmendmentDate: string;
  Shape_Length: number;
}

export type FeatureType =
  | "Footway"
  | "Footbridge"
  | "Subway"
  | "Service Lane"
  | "Traffic Island"
  | "RunIn"
  | "Escalator"
  | "Travelator"
  | "Lift"
  | "Ramp"
  | "Staircase"
  | "Other"
  | "M_Footway"
  | "M_Escalator"
  | "M_Travelator"
  | "M_Lift"
  | "M_Ramp"
  | "M_Staircase"
  | "M_stairlift"
  | "M_Others"
  | "Generalized Walkway Inside Park"
  | "Footpath"
  | "Village"
  | "Track"
  | "Crossing - Signalized"
  | "Crossing - Zebra"
  | "Crossing - Cautionary"
  | "Crossing - Others";
