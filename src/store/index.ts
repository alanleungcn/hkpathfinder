import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PropertiesSlice, createPropertiesSlice } from "./properties";
import { StateSlice, createStateSlice } from "./state";

export const useStore = create<PropertiesSlice & StateSlice>()(
  persist(
    immer(
      devtools((...a) => ({
        ...createPropertiesSlice(...a),
        ...createStateSlice(...a),
      }))
    ),
    { name: "store" }
  )
);
