import React, { useEffect, useRef } from "react";

export interface MapProps extends google.maps.MapOptions {
  className?: string;
  places?: google.maps.places.PlaceResult[];
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

export function Map({
  places = [],
  onClick,
  onIdle,
  children,
  className,
  ...options
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map>();

  useEffect(() => {
    if (ref.current) {
      mapRef.current = new window.google.maps.Map(ref.current, options);
    }

    return () => {
      mapRef.current = undefined;
    };
  }, [options, ref]);

  useEffect(() => {
    places.forEach((place) => {
      new google.maps.Marker({
        position: place.geometry?.location?.toJSON(),
        anchorPoint: new google.maps.Point(0, -24),
        title: place.name,
        map: mapRef.current,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places, mapRef.current]);

  return <div ref={ref} className={className} />;
}

export default Map;
