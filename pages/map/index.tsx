import { Wrapper } from "@googlemaps/react-wrapper";

import { Card, CardContent, Typography } from "@mui/material";
import getConfig from "next/config";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { Autocomplete, Map, MarkedPlace } from "../../components";

import { EMapAction, MapsValue, TAction, TStore } from "../../utils";

import style from "./style.module.scss";

const {
  publicRuntimeConfig: { gmapApi },
} = getConfig();

function Home() {
  const maps = useSelector<TStore, MapsValue>(
    (state) => state.maps,
    shallowEqual
  );

  const thunkDispatch: ThunkDispatch<TStore, {}, TAction> = useDispatch();

  const handleAddNewPlace = useCallback(
    (place: google.maps.places.PlaceResult | undefined) =>
      thunkDispatch(async (dispatch: Dispatch) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 0));
          dispatch({
            type: EMapAction.ADD_PLACE,
            payload: { place },
          });
        } catch (err) {}
      }),
    [thunkDispatch]
  );

  const handleToCenter = useCallback(
    (place: google.maps.places.PlaceResult) => {
      thunkDispatch({
        type: EMapAction.SET_CENTER,
        payload: {
          center: place.geometry?.location?.toJSON(),
        },
      });
    },
    [thunkDispatch]
  );

  const handleDeletePlace = useCallback(
    (place: google.maps.places.PlaceResult) => {
      thunkDispatch({
        type: EMapAction.DELETE_PLACE,
        payload: {
          formatted_address: place.formatted_address,
        },
      });
    },
    [thunkDispatch]
  );

  return (
    <div className={style.wrapper}>
      <Wrapper apiKey={gmapApi} libraries={["places"]}>
        <Card className={style.card} variant="outlined">
          <CardContent className={style.card__content}>
            <Autocomplete onPlaceChanged={handleAddNewPlace} />
            <div className={style.places}>
              <Typography variant="overline">Marked Places</Typography>

              {maps.places.map((place) => (
                <MarkedPlace
                  key={place.formatted_address}
                  className={style.places__item}
                  place={place}
                  onTextClick={handleToCenter}
                  onIconClick={handleDeletePlace}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Map
          className={style.map}
          center={maps.center}
          zoom={13}
          disableDefaultUI
          places={maps.places}
        />
      </Wrapper>
    </div>
  );
}

export default Home;
