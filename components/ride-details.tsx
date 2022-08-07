import { Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import md5 from "md5";

export interface Location {
  address: string;
  time: Date;
}

export interface RideOffer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  pickupDate: Date;
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
  const { pickupDate, pickupLocations, dropoffLocations, name } = rideOffer;
  return (
    <>
      <div>
        <Title className="mb-0 text-lg text-center text-ferra" order={3}>
          {name}
        </Title>
        <Title className="mb-0 text-sm text-center text-ferra" order={4}>
          {dayjs((pickupDate as unknown as Timestamp).toDate()).format(
            "D MMM YYYY"
          )}
        </Title>
      </div>
      {pickupLocations.map((location, i) => {
        const { address, time } = location;
        return (
          <div className="flex flex-col" key={md5(address + time)}>
            <Text className="text-base font-medium text-ferra">
              Pickup {i + 1}
            </Text>
            <div className="flex justify-between text-sm text-stone-500">
              <Text>{address}</Text>
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
        const { address, time } = location;
        return (
          <div className="flex flex-col" key={md5(address + time)}>
            <Text className="text-base font-medium text-ferra">
              Dropoff {i + 1}
            </Text>
            <div className="flex justify-between text-sm text-stone-500">
              <Text>{address}</Text>
              <Text className="whitespace-nowrap">
                {dayjs((time as unknown as Timestamp).toDate()).format(
                  "h:mm a"
                )}
              </Text>
            </div>
          </div>
        );
      })}
    </>
  );
};
