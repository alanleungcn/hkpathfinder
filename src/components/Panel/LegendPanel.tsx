import { useStore } from "@store/index";
import shallow from "zustand/shallow";
import Button from "../Base/Button";
import { featureColor } from "@common/featureColor";
import { FeatureType } from "@common/types";

const LegnedPanel = () => {
  const { legend, setLegend, toggleAllLegend } = useStore(
    (state) => ({
      legend: state.legend,
      setLegend: state.setLegend,
      toggleAllLegend: state.toggleAllLegend,
    }),
    shallow
  );

  const onChange = (k: FeatureType, v: boolean) => setLegend(k, v);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium">Legned</span>
        <Button onClick={() => toggleAllLegend(false)}>Uncheck All</Button>
        <Button onClick={() => toggleAllLegend(true)}>Check All</Button>
      </div>

      <div className="flex flex-col gap-3">
        {Object.entries(featureColor).map(([k, v]) => (
          <label
            htmlFor={k}
            key={k}
            className="flex cursor-pointer items-center gap-4"
          >
            <div
              className="h-5 w-5 rounded-sm shadow-sm"
              style={{ backgroundColor: v }}
            />
            <span>{k}</span>

            <input
              id={k}
              className="ml-auto h-4 w-4 cursor-pointer"
              type="checkbox"
              checked={legend[k as FeatureType]}
              onChange={(e) => onChange(k as FeatureType, e.target.checked)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default LegnedPanel;
