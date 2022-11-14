import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useStore } from "@store/index";
import ReactDOM from "react-dom";
import shallow from "zustand/shallow";
import Button from "../Base/Button";
import LegnedPanel from "./LegendPanel";
import PathfindPanel from "./PathfindPanel";
import PropertiesPanel from "./PropertiesPanel";

const PaneContent = () => {
  const { showPanel, setShowPanel, tabIndex, setTabIndex } = useStore(
    (state) => ({
      showPanel: state.showPanel,
      setShowPanel: state.setShowPanel,
      tabIndex: state.tabIndex,
      setTabIndex: state.setTabIndex,
    }),
    shallow
  );

  const toggleShowPanel = () => setShowPanel(!showPanel);

  return (
    <div
      className={`fixed top-[2.5%] z-[500] ml-[2.5%] mr-[2.5%] w-[95%] rounded-md bg-neutral-50 shadow-xl transition-[top] sm:w-[400px] ${
        showPanel ? "" : "!top-0 !m-0 !w-full"
      }`}
    >
      <div className="">
        <Tabs
          index={tabIndex}
          onChange={setTabIndex}
          className={` ${showPanel ? "visible" : "hidden"}`}
        >
          {({ selectedIndex, focusedIndex }) => (
            <>
              <TabList className="flex w-full rounded-md bg-neutral-50">
                {["Pathfind", "Properties", "Legend"].map((tab, i) => (
                  <Tab
                    key={tab}
                    className={`flex-grow border-b-2 px-4 pt-3 pb-2 transition-all hover:bg-neutral-500/5 ${
                      selectedIndex === i
                        ? "border-b-sky-800"
                        : "border-neutral-200"
                    }`}
                  >
                    {tab}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="max-h-[25vh] overflow-auto px-6 py-4 sm:max-h-[50vh]">
                <TabPanel>
                  <PathfindPanel />
                </TabPanel>
                <TabPanel>
                  <PropertiesPanel />
                </TabPanel>
                <TabPanel>
                  <LegnedPanel />
                </TabPanel>
              </TabPanels>
            </>
          )}
        </Tabs>

        <Button
          onClick={toggleShowPanel}
          className="flex w-full items-center justify-center bg-neutral-50 hover:bg-neutral-100 active:hover:bg-neutral-100"
        >
          {showPanel ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
};

const Pane = () => {
  return ReactDOM.createPortal(<PaneContent />, document.body);
};

export default Pane;
