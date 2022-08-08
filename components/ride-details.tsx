import { Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import md5 from "md5";
import { FaUser } from "react-icons/fa";

export const createLocation = (params: Partial<Location>) => {
  const {
    formatted_address = "",
    datetime = dayjs().toDate(),
    address_components = [],
    geometry = {
      location: {
        lat: 0,
        lng: 0,
      },
    },
    html_attributions = [],
    place_id = "",
  } = params;
  return {
    formatted_address,
    datetime,
    address_components,
    geometry,
    html_attributions,
    place_id,
  };
};

export interface Location {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  datetime: Date;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  html_attributions: any[];
  place_id: string;
}

export interface RideOffer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  pickupDatetime: Date;
  status: "active" | "archived" | "paused";
  pickupLocations: Location[];
  dropoffLocations: Location[];
  uid: string;
  price?: number;
  brand?: string;
  model?: string;
  seatsAvailable: number;
}

interface RideDetailsProps {
  rideOffer: RideOffer;
}

export const RideDetails = (props: RideDetailsProps) => {
  const { rideOffer } = props;
  const { pickupDatetime, pickupLocations, dropoffLocations, name } = rideOffer;
  return (
    <>
      <div>
        <Title className="mb-0 text-lg text-center text-ferra" order={3}>
          {name}
        </Title>
        <Title className="mb-0 text-sm text-center text-ferra" order={4}>
          {dayjs((pickupDatetime as unknown as Timestamp).toDate()).format(
            "D MMM YYYY"
          )}
        </Title>
      </div>
      {pickupLocations.map((location, i) => {
        const { formatted_address, datetime: time } = location;
        return (
          <div className="flex flex-col" key={md5(formatted_address + time)}>
            <Text className="text-base font-medium text-ferra">
              Pickup {i + 1}
            </Text>
            <div className="flex justify-between text-sm text-stone-500">
              <Text>{formatted_address}</Text>
              <Text className="whitespace-nowrap">
                {dayjs((time as unknown as Timestamp).toDate()).format(
                  "h:mm a"
                )}
              </Text>
            </div>
          </div>
        );
      })}
      {dropoffLocations.map((location, i) => {
        const { formatted_address, datetime: time } = location;
        return (
          <div className="flex flex-col" key={md5(formatted_address + time)}>
            <Text className="text-base font-medium text-ferra">
              Dropoff {i + 1}
            </Text>
            <div className="flex justify-between text-sm text-stone-500">
              <Text>{formatted_address}</Text>
              <Text className="whitespace-nowrap">
                {dayjs((time as unknown as Timestamp).toDate()).format(
                  "h:mm a"
                )}
              </Text>
            </div>
          </div>
        );
      })}
      <div className="flex justify-center text-ferra">
        {Array.from(Array(rideOffer.seatsAvailable).keys()).map((i) => {
          return <FaUser key={i} />;
        })}
      </div>
      {rideOffer.price !== undefined && rideOffer.price > 0 && (
        <div className="flex justify-center space-x-1">
          <span className="mb-0 text-sm font-semibold text-center text-ferra">
            Price:
          </span>
          <span className="mb-0 text-sm font-semibold text-center text-ferra">
            Rs. {rideOffer.price}
          </span>
        </div>
      )}
    </>
  );
};
