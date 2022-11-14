import { PedestrianNetworkProperties } from "@common/types";
import { StateCreator } from "zustand";
import { StateSlice } from "./state";

export interface PropertiesSlice {
  showProperties: boolean;
  properties: PedestrianNetworkProperties | null;
  setShowProperties: (show: boolean) => void;
  setProperties: (properties: PedestrianNetworkProperties | null) => void;
}

export const createPropertiesSlice: StateCreator<
  PropertiesSlice & StateSlice,
  [
    ["zustand/persist", unknown],
    ["zustand/immer", never],
    ["zustand/devtools", never]
  ],
  [],
  PropertiesSlice
> = (set) => ({
  showProperties: false,
  properties: null,
  setShowProperties: (show: boolean) =>
    set((state) => {
      state.showProperties = show;
    }),
  setProperties: (properties: PedestrianNetworkProperties | null) =>
    set((state) => {
      state.properties = properties;
    }),
});
