import type { NextApiRequest, NextApiResponse } from "next";
import * as turf from "@turf/turf";
import { PathfindResponse, PedestrianNetworkProperties } from "@common/types";

const PathFinder = require("geojson-path-finder");
const pedestrianNetwork = require("../../../data/extracted_pedestrian_network.json");

// const getNearestPointOnNetwork = (point: number[]) => {
//   // 100 meters
//   const tolerance = 1000;
//   let nearestLine = null;
//   let minDistance = Infinity;

//   // lat lng -> lng lat
//   var toleranceArea = turf.circle([point[1], point[0]], tolerance, {
//     units: "meters",
//     steps: 4,
//   });

//   const features = pedestrianNetwork.features;

//   // Locate nearest geoJSON line
//   for (let i = 0; i < features.length; i++) {
//     if (turf.booleanCrosses(toleranceArea, features[i])) {
//       const distance = turf.pointToLineDistance(point, features[i], {
//         units: "meters",
//       });
//       if (distance < minDistance) {
//         minDistance = distance;
//         nearestLine = pedestrianNetwork.features[i];
//       }
//     }
//   }

//   if (nearestLine)
//     return turf.nearestPointOnLine(nearestLine, point, { units: "meters" });
//   return null;
// };

const flipCoord = (coord: [number, number]): [number, number] => {
  return [coord[1], coord[0]];
};

const pathfind = (
  req: NextApiRequest,
  res: NextApiResponse<PathfindResponse>
) => {
  try {
    // Initalize PathFinder
    const pathFinder = new PathFinder(pedestrianNetwork, {
      weightFn: (
        a: [number, number],
        b: [number, number],
        p: PedestrianNetworkProperties
      ) => {
        if (req.body.mode === "weatherproof" && p.WeatherProof === "NonCovered")
          return { forward: null, backward: null };
        if (req.body.mode === "wheelchair" && p.WheelchairBarrier === "True")
          return { forward: null, backward: null };

        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
      },
      edgeDataReduceFn: (_: unknown, p: PedestrianNetworkProperties) => {
        return p;
      },
    });

    // Transform PathFinder vertices to feature collection
    const v = pathFinder._graph.vertices;
    const vertices = turf.featureCollection(
      Object.keys(v).map(
        function (nodeName: string) {
          var vertice = pathFinder._graph.sourceVertices[nodeName];
          return turf.point(vertice, { nodeName });
        }.bind(this)
      )
    );

    // Snap start/end to nearest point
    const start = turf.nearestPoint(
      turf.point(flipCoord(req.body.startPos)),
      vertices
    );
    const end = turf.nearestPoint(
      turf.point(flipCoord(req.body.endPos)),
      vertices
    );

    // Generate path finding result
    const result = pathFinder.findPath(start, end);

    // GeoJSON [lng, lat] to [lat, lng]
    result.path = result.path.map((coord: [number, number]) =>
      flipCoord(coord)
    );
    const startVertice = flipCoord(
      start.geometry.coordinates as [number, number]
    );
    const endVertice = flipCoord(end.geometry.coordinates as [number, number]);

    // Include direct line to requested position
    result.path = [req.body.startPos, ...result.path, req.body.endPos];

    res.status(200).json({
      startVertice,
      endVertice,
      result,
      distance: turf.length(turf.lineString(result.path), { units: "meters" }),
    });
  } catch {
    res.status(400).json({
      startVertice: null,
      endVertice: null,
      result: null,
      distance: null,
    });
  }
};

export default pathfind;
