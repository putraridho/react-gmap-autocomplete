import { Dispatch } from "redux";
import { EMapAction } from "./types";

export const mapsActions = {
  addPlace(place?: google.maps.places.PlaceResult) {
    return async (dispatch: Dispatch) => {
      dispatch({
        type: EMapAction.SET_LOADING,
        payload: { loading: true },
      });

      // SIMULATING ASYNC FUNCTION
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch({
          type: EMapAction.ADD_PLACE,
          payload: { place },
        });
        dispatch({
          type: EMapAction.SET_LOADING,
          payload: { loading: false },
        });
      } catch (err) {
        dispatch({
          type: EMapAction.SET_LOADING,
          payload: { loading: false },
        });
      }
    };
  },
  deletePlace(formatted_address?: string) {
    return {
      type: EMapAction.DELETE_PLACE,
      payload: { formatted_address },
    };
  },
  setCenter(center?: google.maps.LatLngLiteral) {
    return {
      type: EMapAction.SET_CENTER,
      payload: { center },
    };
  },
  setLoading(loading: boolean) {
    return {
      type: EMapAction.SET_LOADING,
      payload: { loading },
    };
  },
};
