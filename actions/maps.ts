import { Dispatch } from "redux";
import { EMapAction } from "./types";

export const mapsActions = {
  addPlace(place?: google.maps.places.PlaceResult) {
    return async (dispatch: Dispatch) => {
      // SIMULATING ASYNC FUNCTION
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch({
          type: EMapAction.ADD_PLACE,
          payload: { place },
        });
      } catch (err) {}
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
};
