import Button from "@components/Base/Button";
import useDebounce from "@hooks/useDebounce";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { useStore } from "@store/index";
import { useState } from "react";
import useSWR from "swr";
import shallow from "zustand/shallow";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Geocoding = () => {
  const [queryText, setQueryText] = useState<string>("");
  const debouncedQuery = useDebounce(queryText, 1000);
  const { data } = useSWR(
    debouncedQuery
      ? `https://maps.googleapis.com/maps/api/geocode/json?address=${debouncedQuery}&region=hk&key=${process.env.GOOGLE_MAP_API_KEY}`
      : null,
    fetcher
  );

  const { setStartPos, setEndPos } = useStore(
    (state) => ({
      setStartPos: state.setStartPos,
      setEndPos: state.setEndPos,
    }),
    shallow
  );

  const handleSetStart = () => {
    const result = data.results.find(
      (v: any) => v.formatted_address === queryText
    );
    setStartPos([result.geometry.location.lat, result.geometry.location.lng]);
  };
  const handleSetEnd = () => {
    const result = data.results.find(
      (result: any) => result.formatted_address === queryText
    );
    setEndPos([result.geometry.location.lat, result.geometry.location.lng]);
  };

  return (
    <>
      <span className="text-lg font-medium">Search</span>

      <Combobox onSelect={(v) => setQueryText(v)}>
        <ComboboxInput
          onChange={(e) => setQueryText(e.target.value)}
          className="w-full rounded-md border-[1px] border-neutral-200 py-1 px-2"
        />

        {data && data.results && (
          <ComboboxPopover portal={false}>
            {data.results.length > 0 ? (
              <ComboboxList className="w-full rounded-md bg-white shadow-md">
                {data.results.map((result: any, i: number) => (
                  <ComboboxOption
                    key={i}
                    value={result.formatted_address}
                    className="cursor-pointer px-4 py-2 hover:bg-neutral-500/5 active:bg-neutral-500/5"
                  />
                ))}
              </ComboboxList>
            ) : (
              <span>No results found</span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>

      <div className="flex w-full gap-4">
        <Button
          className="flex-1 text-red-500"
          onClick={handleSetStart}
          disabled={!data || !data.results || data.results.length === 0}
        >
          Set as start
        </Button>
        <Button
          className="flex-1 text-green-500"
          onClick={handleSetEnd}
          disabled={!data || !data.results || data.results.length === 0}
        >
          Set as end
        </Button>
      </div>
    </>
  );
};

export default Geocoding;
