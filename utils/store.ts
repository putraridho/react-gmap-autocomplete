import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { TDispatch, reducer, MapsValue } from "@reducers";
import { TAction } from "@actions";

type TStore = { maps: MapsValue };

export const store: Store<TStore, TAction> & {
  dispatch: TDispatch;
} = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type { TStore };
