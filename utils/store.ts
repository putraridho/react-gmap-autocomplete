import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";

import { TDispatch, reducer, MapsValue } from "../reducers";
import { TAction } from "../actions";

type TStore = { maps: MapsValue };

export const store: Store<TStore, TAction> & {
  dispatch: TDispatch;
} = createStore(reducer, applyMiddleware(thunk));

export type { TStore };
