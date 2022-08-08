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
import { Location } from "../components/ride-details";
import { auth, firestore } from "../firebase/firebase";

const MAX_SEATS = 10;
const DEFAULT_AVAILABLE_SEATS = 3;

const OfferRide: NextPage = () => {
  const [pickupDate, setPickupDate] = useState<Date | null>(
    dayjs().startOf("day").toDate()
  );
  const [pickupLocations, setPickupLocations] = useState<Location[]>([
    { address: "", time: dayjs().add(1, "hour").startOf("hour").toDate() },
  ]);
  const [dropoffLocations, setDropoffLocations] = useState<Location[]>([
    { address: "", time: dayjs().add(2, "hour").startOf("hour").toDate() },
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
    if (prop === "address" && typeof value === "string") {
      newPickupLocations[index][prop] = value;
    } else if (prop === "time" && value instanceof Date) {
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
    if (prop === "address" && typeof value === "string") {
      newDropoffLocations[index][prop] = value;
    } else if (prop === "time" && value instanceof Date) {
      newDropoffLocations[index][prop] = value;
    }
    setDropoffLocations(newDropoffLocations);
  };

  return (
    <Layout>
      <div className="p-4">
        <form
          className="space-y-4"
          onSubmit={onSubmit(async () => {
            if (!auth.currentUser?.uid) {
              router.push("/auth");
            } else {
              const { displayName, uid, phoneNumber } = auth.currentUser;
              const data = {
                name: displayName,
                uid,
                phoneNumber,
                pickupDate,
                pickupLocations,
                dropoffLocations,
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
          })}
        >
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
            value={pickupDate}
            onChange={setPickupDate}
          />
          <Title order={2} className="text-lg font-semibold text-center">
            Where will you pickup passengers and what time?
          </Title>
          {pickupLocations.map((location, i) => {
            return (
              <div className="flex flex-col space-y-4" key={i}>
                <PlacesInput
                  value={location.address}
                  onChange={(value: string) => {
                    handlePickupLocationChanges("address", i, value);
                  }}
                />
                <TimeInput
                  required
                  size="lg"
                  placeholder="Pickup Time"
                  value={dayjs(location.time).toDate()}
                  onChange={(value) => {
                    handlePickupLocationChanges("time", i, value);
                  }}
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
                        {
                          address: "",
                          time: dayjs(pickupLocations[i].time)
                            .add(20, "minute")
                            .toDate(),
                        },
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
                  value={location.address}
                  onChange={(value: string) => {
                    handleDropoffLocationChanges("address", i, value);
                  }}
                />
                <TimeInput
                  required
                  size="lg"
                  placeholder="Dropoff Time"
                  value={dayjs(location.time).toDate()}
                  onChange={(value) => {
                    handleDropoffLocationChanges("time", i, value);
                  }}
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
                        {
                          address: "",
                          time: dayjs(dropoffLocations[i].time)
                            .add(20, "minute")
                            .toDate(),
                        },
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
