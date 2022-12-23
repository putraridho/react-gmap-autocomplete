import axios from "axios";
import { Dispatch } from "redux";
import { EMapAction } from "./types";

export const mapsActions = {
  getPlaces() {
    return async (dispatch: Dispatch) => {
      dispatch({ type: EMapAction.GET_PLACES_REQUEST });
      try {
        const response = await axios.get("/api/map");
        dispatch({
          type: EMapAction.GET_PLACES,
          payload: { places: response.data.data },
        });
      } catch (error) {
        dispatch({ type: EMapAction.GET_PLACES_FAILURE, payload: { error } });
      }
    };
  },
  addPlace(place?: google.maps.places.PlaceResult) {
    return async (dispatch: Dispatch) => {
      if (place?.formatted_address) {
        dispatch({ type: EMapAction.ADD_PLACE_REQUEST });
        try {
          await axios.post("/api/map", place);
          dispatch({
            type: EMapAction.ADD_PLACE,
            payload: { place },
          });
        } catch (error) {
          dispatch({ type: EMapAction.ADD_PLACE_FAILURE, payload: { error } });
        }
      }
    };
  },
  deletePlace(formatted_address?: string) {
    return async (dispatch: Dispatch) => {
      dispatch({ type: EMapAction.DELETE_PLACE_REQUEST });
      try {
        await axios.delete(`/api/map?formatted_address=${formatted_address}`);
        dispatch({
          type: EMapAction.DELETE_PLACE,
          payload: { formatted_address },
        });
      } catch (error) {
        dispatch({ type: EMapAction.DELETE_PLACE_FAILURE, payload: { error } });
      }
    };
  },
  setCenter(center?: google.maps.LatLngLiteral) {
    return {
      type: EMapAction.SET_CENTER,
      payload: { center },
    };
  },
};
