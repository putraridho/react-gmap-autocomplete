import { Wrapper } from "@googlemaps/react-wrapper";
import { Card, CardContent, Typography } from "@mui/material";
import getConfig from "next/config";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { mapsActions, TAction } from "@actions";
import { Autocomplete, Map, MarkedPlace } from "@components";
import { MapsValue } from "@reducers";
import { TStore } from "@utils";

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
      thunkDispatch(mapsActions.addPlace(place)),
    [thunkDispatch]
  );

  const handleToCenter = useCallback(
    (place: google.maps.places.PlaceResult) => {
      thunkDispatch(mapsActions.setCenter(place.geometry?.location?.toJSON()));
    },
    [thunkDispatch]
  );

  const handleDeletePlace = useCallback(
    (place: google.maps.places.PlaceResult) => {
      thunkDispatch(mapsActions.deletePlace(place.formatted_address));
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
