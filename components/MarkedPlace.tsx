import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { memo, useCallback } from "react";

interface MarkedPlaceProps {
  className?: string;
  place: google.maps.places.PlaceResult;
  onTextClick?: (place: google.maps.places.PlaceResult) => void;
  onIconClick?: (place: google.maps.places.PlaceResult) => void;
}

export const MarkedPlace = memo(function MarkedPlace({
  className,
  place,
  onTextClick = () => null,
  onIconClick = () => null,
}: MarkedPlaceProps) {
  const handleTextClick = useCallback(
    () => onTextClick(place),
    [onTextClick, place]
  );

  const handleIconClick = useCallback(
    () => onIconClick(place),
    [onIconClick, place]
  );

  return (
    <div className={className}>
      <Typography variant="body2" onClick={handleTextClick}>
        {place.formatted_address}
      </Typography>
      <IconButton
        aria-label="delete item"
        size="small"
        onClick={handleIconClick}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
