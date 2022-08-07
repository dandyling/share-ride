import { Text, Title } from "@mantine/core";
import md5 from "md5";

export interface Location {
  address: string;
  time: string;
}

export interface RideOffer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  pickupDate: string;
  status: "active" | "archived" | "paused";
  pickupLocations: Location[];
  dropoffLocations: Location[];
  uid: string;
  price?: number;
  brand?: string;
  model?: string;
}

interface RideDetailsProps {
  rideOffer: RideOffer;
}

export const RideDetails = (props: RideDetailsProps) => {
  const { rideOffer } = props;
  const { name, pickupLocations, dropoffLocations } = rideOffer;
  return (
    <>
      <Title className="text-center text-ferra" order={3}>
        {name}
      </Title>
      {pickupLocations.map((location) => {
        const { address, time } = location;
        return (
          <div className="flex flex-col" key={md5(address + time)}>
            <Text className="text-lg font-medium">Pickup</Text>
            <div className="flex justify-between text-stone-500">
              <Text>{address}</Text>
              <Text>{time}</Text>
            </div>
          </div>
        );
      })}
      {dropoffLocations.map((location) => {
        const { address, time } = location;
        return (
          <div className="flex flex-col" key={md5(address + time)}>
            <Text className="text-lg font-medium">Dropoff</Text>
            <div className="flex justify-between text-stone-500">
              <Text>{address}</Text>
              <Text>{time}</Text>
            </div>
          </div>
        );
      })}
    </>
  );
};
