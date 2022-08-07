import { Button, Card, Loader, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { collection, getDocs, query } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { RideDetails, RideOffer } from "../components/ride-details";
import { firestore } from "../firebase/firebase";

const Home: NextPage = () => {
  const [rideOffers, setRideOffers] = useState<RideOffer[]>([]);
  const [fetching, setFetching] = useState(false);

  const fetchRideOffers = async () => {
    setFetching(true);
    try {
      const q = query(collection(firestore, "rideOffers"));
      const querySnapshot = await getDocs(q);
      const offers = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as RideOffer;
      });
      setFetching(false);
      setRideOffers(offers);
    } catch (error: any) {
      setFetching(false);
      showNotification({
        title: "Fetch carpool error",
        message: error.message,
        classNames: {
          root: "before:bg-red-500",
        },
      });
      setRideOffers([]);
    }
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
          <div>
            <Image
              src="/carpool-friends.svg"
              width={16}
              height={9}
              layout="responsive"
              objectFit="cover"
              alt="Carpool Friends"
              priority
            />
          </div>
          <div className="p-4 space-y-2">
            <Title order={1} className="text-ferra">
              Find a ride
            </Title>
            <Text className="text-ferra">
              Find a carpool by going through the list below
            </Text>
          </div>
          <div className="relative flex flex-col">
            <>
              {rideOffers.map((rideOffer) => {
                return (
                  <Card className="py-8 space-y-2 border-t" key={rideOffer.id}>
                    <RideDetails rideOffer={rideOffer} />
                    <div className="flex justify-center">
                      <Button size="lg" className="my-1 bg-primary">
                        Message
                      </Button>
                    </div>
                  </Card>
                );
              })}
              {fetching && (
                <Card className="flex justify-center w-full py-16 space-y-2 border-t">
                  <Loader />
                </Card>
              )}
            </>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
