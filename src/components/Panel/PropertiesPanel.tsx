import { useStore } from "@store/index";
import shallow from "zustand/shallow";
import Button from "../Base/Button";

const PropertiesPanel = () => {
  const { properties, showProperties, setProperties, setShowProperties } =
    useStore(
      (state) => ({
        properties: state.properties,
        showProperties: state.showProperties,
        setProperties: state.setProperties,
        setShowProperties: state.setShowProperties,
      }),
      shallow
    );

  const clear = () => {
    setShowProperties(false);
    setProperties(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium">Propeties</span>
        <Button onClick={clear}>Clear Selection</Button>
      </div>

      {showProperties ? (
        <table>
          <tbody>
            {Object.entries(properties as {}).map(([key, value]) => (
              <tr key={key}>
                <td className="py-1">{key}</td>
                <td className="py-1 text-right">
                  {/* @ts-ignore */}
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="pt-2 text-center text-sm text-neutral-600">
          Click on a feature to show properties
        </span>
      )}
    </div>
  );
};

export default PropertiesPanel;
