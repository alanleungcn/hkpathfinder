import dynamic from "next/dynamic";

const Map = dynamic(() => import("@components/Map"), {
  ssr: false,
});

const Pane = dynamic(() => import("@components/Panel/index"), {
  ssr: false,
});

const Index = () => {
  return (
    <>
      <Pane />
      <Map />
    </>
  );
};

export default Index;
