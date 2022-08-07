import { TextInput } from "@mantine/core";
import { usePlacesWidget } from "react-google-autocomplete";

interface PlacesInputProps {
  value: string;
  onChange(value: string): void;
}

export const PlacesInput = (props: PlacesInputProps) => {
  const { value, onChange } = props;
  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      onChange(place.formatted_address);
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
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
};
