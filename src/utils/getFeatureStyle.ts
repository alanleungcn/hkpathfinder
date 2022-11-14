import { featureColor } from "./../common/featureColor";
import { PedestrianNetworkProperties } from "@common/types";
import { useStore } from "@store/index";
import { PathOptions } from "leaflet";

const normalize = (val: number, min: number, max: number) => {
  return (val - min) / (max - min);
};

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const showFeatureType = (properties: PedestrianNetworkProperties) => {
  const legend = useStore.getState().legend;
  return legend[properties.FeatureType];
};

export const getFeatureStyle = (
  properties: PedestrianNetworkProperties,
  zoom: number
): PathOptions => {
  const objectId = useStore.getState().properties?.OBJECTID;
  const showGradient = useStore.getState().showGradient;
  const showWeatherproof = useStore.getState().showWeatherproof;
  const showWheelchair = useStore.getState().showWheelchair;

  const selected = properties.OBJECTID === objectId;

  const isLift = ["Lift", "M_Lift", "M_stairlift"].includes(
    properties.FeatureType
  );
  const isFootway = [
    "Footway",
    "Footpath",
    "M_Footway",
    "Service Lane",
    "Generalized Walkway Inside Park",
  ].includes(properties.FeatureType);

  const weight =
    zoom < 16
      ? 1
      : zoom == 16
      ? 2
      : zoom == 17
      ? 4
      : zoom == 18
      ? 6
      : zoom === 19
      ? 8
      : 16;

  const weatherproofHidden =
    showWeatherproof && properties.WeatherProof == "NonCovered";
  const wheenchairHidden =
    showWheelchair && properties.WheelchairBarrier == "True";

  if (!showFeatureType(properties) || weatherproofHidden || wheenchairHidden)
    return { stroke: false };

  return {
    color: selected
      ? "#ff0000"
      : showGradient
      ? hslToHex(
          20,
          Math.min(normalize(properties.Gradient, 0, 1) * 100 + 1, 100),
          50
        )
      : featureColor[properties.FeatureType],
    weight: isLift ? weight * 2 : weight,
    opacity: showGradient
      ? Math.min(normalize(properties.Gradient, 0, 1) + 0.8, 1)
      : isFootway
      ? 0.8
      : 1,
  };
};
