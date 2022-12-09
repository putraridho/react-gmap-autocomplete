import { combineReducers } from "redux";
import { TAction } from "../actions";
import maps, { TMapsReducer, MapsValue } from "./maps";

export const reducer = combineReducers({ maps });

type TDispatch = (args: TAction) => TAction;
type TReducer = {
  maps: TMapsReducer;
};

export type { TDispatch, TReducer, MapsValue };
