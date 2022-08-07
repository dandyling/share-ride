import { ActionIcon, Button, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Layout } from "../components/layout";
import { Location } from "../components/ride-details";
import { auth, firestore } from "../firebase/firebase";

const OfferRide: NextPage = () => {
  const [pickupDate, setPickupDate] = useState<Date | null>(dayjs().toDate());
  const [pickupLocations, setPickupLocations] = useState<Location[]>([
    { address: "", time: "" },
  ]);
  const [dropoffLocations, setDropoffLocations] = useState<Location[]>([
    { address: "", time: "" },
  ]);
  const { onSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  return (
    <Layout>
      <div className="p-4">
        <form
          className="space-y-4"
          onSubmit={onSubmit(async () => {
            if (!auth.currentUser?.uid) {
              router.push("/auth");
            } else {
              const data = {
                uid: auth.currentUser.uid,
                pickupDate: pickupDate?.toISOString(),
                pickupLocations,
                dropoffLocations,
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
          <DatePicker
            placeholder="Pick Date"
            label="Date"
            required
            size="lg"
            value={pickupDate}
            onChange={setPickupDate}
          />
          {pickupLocations.map((location, i) => {
            return (
              <div className="flex flex-col space-y-4" key={i}>
                <Title order={3} className="text-base font-semibold">{`Pickup ${
                  i + 1
                }`}</Title>
                <TextInput
                  size="lg"
                  placeholder="Pick Location"
                  value={location.address}
                  onChange={(e) => {
                    const newPickupLocations = [...pickupLocations];
                    newPickupLocations[i].address = e.currentTarget.value;
                    setPickupLocations(newPickupLocations);
                  }}
                />
                <TextInput
                  size="lg"
                  placeholder="Pick Time"
                  value={location.time}
                  onChange={(e) => {
                    const newPickupLocations = [...pickupLocations];
                    newPickupLocations[i].time = e.currentTarget.value;
                    setPickupLocations(newPickupLocations);
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
                        { address: "", time: "" },
                      ]);
                    }}
                  >
                    <FaPlusCircle className="text-2xl text-ferra" />
                  </ActionIcon>
                )}
              </div>
            );
          })}
          {dropoffLocations.map((location, i) => {
            return (
              <div className="flex flex-col space-y-4" key={i}>
                <Title
                  order={3}
                  className="text-base font-semibold"
                >{`Dropoff ${i + 1}`}</Title>
                <TextInput
                  size="lg"
                  placeholder="Dropoff Location"
                  value={location.address}
                  onChange={(e) => {
                    const newDropoffLocations = [...dropoffLocations];
                    newDropoffLocations[i].address = e.currentTarget.value;
                    setDropoffLocations(newDropoffLocations);
                  }}
                />
                <TextInput
                  size="lg"
                  placeholder="Dropoff Time"
                  value={location.time}
                  onChange={(e) => {
                    const newDropoffLocations = [...dropoffLocations];
                    newDropoffLocations[i].time = e.currentTarget.value;
                    setDropoffLocations(newDropoffLocations);
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
                        { address: "", time: "" },
                      ]);
                    }}
                  >
                    <FaPlusCircle className="text-2xl text-ferra" />
                  </ActionIcon>
                )}
              </div>
            );
          })}
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
