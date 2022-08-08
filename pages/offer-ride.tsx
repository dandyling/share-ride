import { ActionIcon, Button, NumberInput, Select, Title } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Layout } from "../components/layout";
import { PlacesInput } from "../components/places-input";
import { createLocation, Location } from "../components/ride-details";
import { auth, firestore } from "../firebase/firebase";

const MAX_SEATS = 10;
const DEFAULT_AVAILABLE_SEATS = 3;

const OfferRide: NextPage = () => {
  const [pickupDatetime, setPickupDatetime] = useState<Date | null>(
    dayjs().startOf("day").toDate()
  );
  const [pickupLocations, setPickupLocations] = useState<Location[]>([
    createLocation({
      datetime: dayjs().add(1, "hour").startOf("hour").toDate(),
    }),
  ]);
  const [dropoffLocations, setDropoffLocations] = useState<Location[]>([
    createLocation({
      datetime: dayjs().add(2, "hour").startOf("hour").toDate(),
    }),
  ]);
  const [seats, setSeats] = useState<number | undefined>(
    DEFAULT_AVAILABLE_SEATS
  );
  const [price, setPrice] = useState<number | undefined>(0);

  const { onSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handlePickupLocationChanges = (
    prop: keyof Location,
    index: number,
    value: string | Date
  ) => {
    const newPickupLocations = [...pickupLocations];
    if (prop === "formatted_address" && typeof value === "string") {
      newPickupLocations[index][prop] = value;
    } else if (prop === "datetime" && value instanceof Date) {
      newPickupLocations[index][prop] = value;
    }
    setPickupLocations(newPickupLocations);
  };

  const handleDropoffLocationChanges = (
    prop: keyof Location,
    index: number,
    value: string | Date
  ) => {
    const newDropoffLocations = [...dropoffLocations];
    if (prop === "formatted_address" && typeof value === "string") {
      newDropoffLocations[index][prop] = value;
    } else if (prop === "datetime" && value instanceof Date) {
      newDropoffLocations[index][prop] = value;
    }
    setDropoffLocations(newDropoffLocations);
  };

  const handleSubmit = onSubmit(async () => {
    if (!auth.currentUser?.uid) {
      router.push("/auth");
    } else {
      const { displayName, uid, phoneNumber } = auth.currentUser;
      const data = {
        name: displayName,
        uid,
        phoneNumber,
        pickupDatetime: getPickupDatetime(
          pickupLocations[0].datetime,
          pickupDatetime
        ),
        dropoffDatetime: getDropoffDatetime(
          pickupLocations[pickupLocations.length - 1].datetime,
          dropoffLocations[dropoffLocations.length - 1].datetime,
          pickupDatetime
        ),
        pickupLocations: pickupLocations.map((location) => {
          const datetime = getPickupDatetime(location.datetime, pickupDatetime);
          return { ...location, datetime };
        }),
        dropoffLocations: dropoffLocations.map((location, i) => {
          const datetime = getDropoffDatetime(
            pickupLocations[i].datetime,
            location.datetime,
            pickupDatetime
          );
          return { ...location, datetime };
        }),
        price,
        seatsAvailable: seats,
      };
      setSubmitting(true);
      try {
        await addDoc(collection(firestore, "rideOffers"), data);
        setSubmitting(false);
        router.push("/");
      } catch (error: any) {
        setSubmitting(false);
        showNotification({
          title: "Error sharing ride",
          message: error.message,
          classNames: {
            root: "before:bg-red-500",
          },
        });
      }
    }
  });

  return (
    <Layout>
      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Title
            order={1}
            className="text-2xl font-semibold text-center text-ferra"
          >
            Offer a ride
          </Title>
          <DatePicker
            label="Date"
            placeholder="Pick Date"
            classNames={{ label: "text-sm" }}
            required
            size="lg"
            value={pickupDatetime}
            onChange={setPickupDatetime}
          />
          <Title order={2} className="text-lg font-semibold text-center">
            Where will you pickup passengers and what time?
          </Title>
          {pickupLocations.map((location, i) => {
            return (
              <div className="flex flex-col space-y-4" key={i}>
                <PlacesInput
                  value={location}
                  onChange={(value: Location) => {
                    const newPickupLocations = [...pickupLocations];
                    newPickupLocations[i] = value;
                    setPickupLocations(newPickupLocations);
                  }}
                />
                <TimeInput
                  required
                  size="lg"
                  format="12"
                  placeholder="Pickup Time"
                  value={dayjs(location.datetime).toDate()}
                  onChange={(value) => {
                    handlePickupLocationChanges("datetime", i, value);
                  }}
                  error={
                    (isToday(location.datetime) &&
                      dayjs(location.datetime).isBefore(dayjs())) ??
                    "Time cannot be in the pass"
                  }
                />
                {i < pickupLocations.length - 1 && (
                  <ActionIcon
                    className="self-center"
                    onClick={() => {
                      setPickupLocations([
                        ...pickupLocations.slice(0, i),
                        ...pickupLocations.slice(i + 1),
                      ]);
                    }}
                  >
                    <FaMinusCircle className="text-2xl text-ferra" />
                  </ActionIcon>
                )}
                {i === pickupLocations.length - 1 && (
                  <ActionIcon
                    className="self-center"
                    onClick={() => {
                      setPickupLocations([
                        ...pickupLocations,
                        createLocation({
                          datetime: dayjs(pickupLocations[i].datetime)
                            .add(20, "minute")
                            .toDate(),
                        }),
                      ]);
                    }}
                  >
                    <FaPlusCircle className="text-2xl text-ferra" />
                  </ActionIcon>
                )}
              </div>
            );
          })}
          <Title order={2} className="text-lg font-semibold text-center">
            Where will you dropoff passengers and around what time?
          </Title>
          {dropoffLocations.map((location, i) => {
            return (
              <div className="flex flex-col space-y-4" key={i}>
                <PlacesInput
                  value={location}
                  onChange={(value: Location) => {
                    const newDropoffLocations = [...dropoffLocations];
                    newDropoffLocations[i] = value;
                    setDropoffLocations(newDropoffLocations);
                  }}
                />
                <TimeInput
                  required
                  size="lg"
                  format="12"
                  placeholder="Dropoff Time"
                  value={dayjs(location.datetime).toDate()}
                  onChange={(value) => {
                    handleDropoffLocationChanges("datetime", i, value);
                  }}
                  error={
                    (isToday(location.datetime) &&
                      dayjs(location.datetime).isBefore(dayjs())) ??
                    "Time cannot be in the pass"
                  }
                />
                {i < dropoffLocations.length - 1 && (
                  <ActionIcon
                    className="self-center"
                    onClick={() => {
                      setDropoffLocations([
                        ...dropoffLocations.slice(0, i),
                        ...dropoffLocations.slice(i + 1),
                      ]);
                    }}
                  >
                    <FaMinusCircle className="text-2xl text-ferra" />
                  </ActionIcon>
                )}
                {i === dropoffLocations.length - 1 && (
                  <ActionIcon
                    className="self-center"
                    onClick={() => {
                      setDropoffLocations([
                        ...dropoffLocations,
                        createLocation({
                          datetime: dayjs(dropoffLocations[i].datetime)
                            .add(20, "minute")
                            .toDate(),
                        }),
                      ]);
                    }}
                  >
                    <FaPlusCircle className="text-2xl text-ferra" />
                  </ActionIcon>
                )}
              </div>
            );
          })}
          <Select
            required
            label="Number of seats available"
            placeholder="Number of seats"
            classNames={{ label: "text-sm" }}
            size="lg"
            value={String(seats)}
            onChange={(value) => setSeats(Number(value))}
            data={Array.from(Array(MAX_SEATS).keys()).map((i) => ({
              value: String(i + 1),
              label: String(i + 1),
            }))}
          />
          <NumberInput
            size="lg"
            label="Price per seat"
            classNames={{ label: "text-sm" }}
            value={price}
            onChange={setPrice}
            placeholder="Price"
            hideControls
            parser={(value) => value?.replace(/Rs. \s?|(,*)/g, "")}
            formatter={(value) =>
              value && !Number.isNaN(parseFloat(value))
                ? `Rs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "Rs. "
            }
          />
          <div className="flex justify-center">
            <Button
              loading={submitting}
              disabled={submitting}
              type="submit"
              size="lg"
              className="bg-primary"
              loaderPosition="right"
            >
              Share ride
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default OfferRide;

const getPickupDatetime = (time: Date, pickupDate: Date | null) => {
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  const datetime = dayjs(pickupDate)
    .startOf("day")
    .add(hour, "hour")
    .add(minute, "minute")
    .toDate();
  return datetime;
};

const getDropoffDatetime = (
  pickupTime: Date,
  dropoffTime: Date,
  pickupDate: Date | null
) => {
  const dropoffHour = dayjs(dropoffTime).hour();
  const dropoffMinute = dayjs(dropoffTime).minute();
  const datetime = dayjs(pickupDate)
    .startOf("day")
    .add(dropoffHour, "hour")
    .add(dropoffMinute, "minute");
  const pickupHour = dayjs(pickupTime).hour();
  if (dropoffHour < pickupHour) {
    return datetime.add(1, "day").toDate();
  } else {
    return datetime.toDate();
  }
};

export const isToday = (date: Date) => {
  return dayjs(date).isSame(dayjs(), "day");
};
