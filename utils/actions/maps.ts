import { EMapAction } from "./types";

export const maps = {
  addPlace(place?: google.maps.places.PlaceResult) {
    return {
      type: EMapAction.ADD_PLACE,
      payload: { place },
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
