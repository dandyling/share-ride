import { TextInput } from "@mantine/core";
import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Location } from "./ride-details";

interface PlacesInputProps {
  value: Location;
  onChange(value: Location): void;
}

export const PlacesInput = (props: PlacesInputProps) => {
  const { value, onChange } = props;
  const [address, setAddress] = useState("");
  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      setAddress(place.formatted_address);
      onChange({
        address_components: place.address_components,
        formatted_address: place.formatted_address,
        datetime: value.datetime,
        geometry: {
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        },
        html_attributions: place.html_attributions,
        place_id: place.place_id,
      });
    },
    options: {
      componentRestrictions: { country: "lk" },
    },
  });

  return (
    <TextInput
      ref={ref as any}
      required
      size="lg"
      placeholder="Location"
      value={address}
      onChange={(e) => {
        setAddress(e.currentTarget.value);
      }}
    />
  );
};
