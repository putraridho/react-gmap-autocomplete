import { Reducer } from "redux";
import { TAction } from "../actions";
import { EMapAction } from "../actions/types";

export interface MapsValue {
  places: Array<google.maps.places.PlaceResult>;
  center: google.maps.LatLngLiteral;
}

export type TMapsReducer = Reducer<MapsValue, TAction>;

const initialState: MapsValue = {
  places: [],
  center: { lat: -6.2, lng: 106.816666 },
};

export const mapsReducer: TMapsReducer = (
  state = initialState,
  action: TAction
): MapsValue => {
  switch (action.type) {
    case EMapAction.ADD_PLACE: {
      const places = [...state.places];

      if (
        action.payload.place &&
        !places.some(
          (place) =>
            place.formatted_address === action.payload.place?.formatted_address
        )
      ) {
        places.push(action.payload.place);
      }

      return {
        ...state,
        places,
        center:
          action.payload.place?.geometry?.location?.toJSON() || state.center,
      };
    }

    case EMapAction.DELETE_PLACE: {
      const places = [...state.places].filter(
        (place) => place.formatted_address !== action.payload.formatted_address
      );

      return {
        ...state,
        places,
      };
    }

    case EMapAction.SET_CENTER: {
      return {
        ...state,
        center: action.payload.center || state.center,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default mapsReducer;
