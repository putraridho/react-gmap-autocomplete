import { Reducer } from "redux";
import { TAction } from "../actions";
import { EMapAction } from "../actions/types";

export interface MapsValue {
  places: Array<google.maps.places.PlaceResult>;
  center: google.maps.LatLngLiteral;
  loading: boolean;
  error: any | undefined;
}

export type TMapsReducer = Reducer<MapsValue, TAction>;

const initialState: MapsValue = {
  places: [],
  center: { lat: -6.2, lng: 106.816666 },
  loading: false,
  error: undefined,
};

export const mapsReducer: TMapsReducer = (
  state = initialState,
  action: TAction,
): MapsValue => {
  switch (action.type) {
    case EMapAction.GET_PLACES: {
      return {
        ...state,
        places: action.payload.places,
        loading: false,
        error: undefined,
      };
    }
    case EMapAction.ADD_PLACE: {
      const places = [...state.places];

      if (
        action.payload.place &&
        !places.some(
          (place) =>
            place.formatted_address === action.payload.place?.formatted_address,
        )
      ) {
        places.push(action.payload.place);
      }

      return {
        ...state,
        places,
        center:
          action.payload.place?.geometry?.location?.toJSON() || state.center,
        loading: false,
        error: undefined,
      };
    }

    case EMapAction.DELETE_PLACE: {
      const places = [...state.places].filter(
        (place) => place.formatted_address !== action.payload.formatted_address,
      );

      return {
        ...state,
        places,
        loading: false,
        error: undefined,
      };
    }

    case EMapAction.SET_CENTER: {
      return {
        ...state,
        center: action.payload.center || state.center,
      };
    }

    case EMapAction.GET_PLACES_REQUEST:
    case EMapAction.ADD_PLACE_REQUEST:
    case EMapAction.DELETE_PLACE_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case EMapAction.GET_PLACES_REQUEST:
    case EMapAction.ADD_PLACE_REQUEST:
    case EMapAction.DELETE_PLACE_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

export default mapsReducer;
