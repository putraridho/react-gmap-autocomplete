import dynamic from "next/dynamic";

export * from "./Autocomplete";
import { MapProps } from "./Map";
export * from "./MarkedPlace";

export const Map = dynamic(
  import("./Map").then((cmp) => cmp.Map),
  { ssr: false },
) as React.FC<MapProps>;
