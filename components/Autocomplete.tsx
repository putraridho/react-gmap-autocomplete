import { useEffect, useRef } from "react";

import { LinearProgress, TextField } from "@mui/material";

interface AutocompleteProps {
  options?: google.maps.places.AutocompleteOptions;
  onPlaceChanged?: (place: google.maps.places.PlaceResult | undefined) => void;
  loading?: boolean;
  className?: string;
}

export function Autocomplete({
  onPlaceChanged,
  options,
  loading,
  ...props
}: AutocompleteProps) {
  const ref = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      ref.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
    }

    return () => {
      ref.current?.unbindAll();
      ref.current = undefined;
    };
  }, [options]);

  useEffect(() => {
    ref.current?.addListener("place_changed", () => {
      const place = ref.current?.getPlace();
      onPlaceChanged && onPlaceChanged(place);
    });
  }, [onPlaceChanged]);

  return (
    <div>
      <TextField inputRef={inputRef} {...props} />
      {loading && <LinearProgress />}
    </div>
  );
}

export default Autocomplete;
