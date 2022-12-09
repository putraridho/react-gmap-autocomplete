import { EMapAction } from "./types";

export * from "./maps";
export * from "./types";

export type TAction = {
  type: EMapAction;
  payload: { [key: string]: any };
};
