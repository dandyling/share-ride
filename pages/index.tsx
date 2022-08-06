import { Button, Card, Text, Title } from "@mantine/core";
import { query, collection, getDocs } from "firebase/firestore";
import md5 from "md5";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { firestore } from "../firebase/firebase";

export interface Location {
  address: string;
  time: string;
}
interface RideOffer {
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

const Home: NextPage = () => {
  const [rideOffers, setRideOffers] = useState<RideOffer[]>([]);

  const fetchRideOffers = async () => {
    const q = query(collection(firestore, "rideOffers"));
    const querySnapshot = await getDocs(q);
    const offers = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as RideOffer;
    });
    setRideOffers(offers);
  };

  useEffect(() => {
    fetchRideOffers();
  }, []);

  return (
    <div>
      <Head>
        <title>ShareRide</title>
        <meta
          name="description"
          content="Share your ride by carpooling with others, and share your costs while helping others to travel"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col h-full">
          {/* Next image width and height are ratios of the image dimensions.
          Use responsive in conjunction with cover */}
          <Image
            src="/carpool-friends.svg"
            width={16}
            height={9}
            layout="responsive"
            objectFit="cover"
            alt="Carpool Friends"
          />
          <div className="p-4 space-y-2">
            <Title order={1} className="text-ferra">
              Find a ride
            </Title>
            <Text className="text-ferra">
              Find a carpool by going through the list below
            </Text>
          </div>
          <div className="flex flex-col">
            {rideOffers.map((rideOffer) => {
              const { name, pickupLocations, dropoffLocations, id } = rideOffer;
              return (
                <Card className="py-8 space-y-2 border-t-2" key={id}>
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
                  <div className="flex justify-center">
                    <Button size="lg" className="my-1 bg-primary">
                      Message
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
