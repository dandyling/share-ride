import { ActionIcon, Button, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Layout } from "../components/layout";
import { Location } from "./index";

const OfferRide: NextPage = () => {
  const [pickupLocations, setPickupLocations] = useState<Location[]>([
    { address: "", time: "" },
  ]);
  const [dropoffLocations, setDropoffLocations] = useState<Location[]>([
    { address: "", time: "" },
  ]);
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      pickupDate: dayjs().toDate(),
      pickupLocations,
      dropoffLocations,
    },
    validate: {
      pickupDate: (value) => (value ? null : "Invalid date"),
      pickupLocations: (value) =>
        value.length > 0 ? null : "Need at least one pickup location",
      dropoffLocations: (value) =>
        value.length > 0 ? null : "Need at least one dropoff location",
    },
  });

  return (
    <Layout>
      <div className="p-4">
        <form
          className="space-y-4"
          onSubmit={onSubmit((values) => {
            console.log({ ...values, pickupLocations, dropoffLocations });
          })}
        >
          <DatePicker
            placeholder="Pick Date"
            label="Date"
            required
            size="lg"
            {...getInputProps("pickupDate")}
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
            <Button type="submit" size="lg" className=" bg-primary">
              Share ride
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default OfferRide;
