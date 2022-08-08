import { ActionIcon, Button, Card, Loader, Text, Title } from "@mantine/core";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { Layout } from "../components/layout";
import { RideDetails, RideOffer } from "../components/ride-details";
import { firestore } from "../firebase/firebase";

const Home: NextPage = () => {
  const [rideOffers, setRideOffers] = useState<RideOffer[]>([]);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    dayjs().startOf("day").toDate(),
    dayjs().add(1, "day").endOf("day").toDate(),
  ]);
  const [fetching, setFetching] = useState<boolean>();
  const router = useRouter();

  const fetchRideOffers = async () => {
    setFetching(true);
    if (dateRange[0] && dateRange[1]) {
      try {
        const q = query(
          collection(firestore, "rideOffers"),
          where("pickupDate", ">=", dateRange[0]),
          where("pickupDate", "<", dayjs(dateRange[1]).endOf("day").toDate())
        );
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
    }
  };

  useEffect(() => {
    fetchRideOffers();
  }, [dateRange]);

  return (
    <div>
      <Head>
        <title>ShareRide</title>
        <meta
          name="description"
          content="Share your ride by carpooling with others. Share your costs while helping others to travel"
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
          <div className="px-4 py-8 space-y-4 border-b">
            <div>
              <Title order={1} className="text-2xl font-semibold text-ferra">
                Share a ride
              </Title>
              <Text className="text-sm text-ferra">
                (Share your car ride by clicking the button below)
              </Text>
            </div>
            <Button
              size="lg"
              className="w-full bg-primary"
              loaderPosition="right"
              onClick={() => router.push("/offer-ride")}
            >
              Share ride
            </Button>
          </div>
          <div className="px-4 pt-8 space-y-4 ">
            <div>
              <Title order={1} className="text-2xl font-semibold text-ferra">
                Find a ride
              </Title>
              <Text className="text-sm text-ferra">
                (Find a carpool by picking a date below)
              </Text>
            </div>
            <DateRangePicker
              placeholder="Pick Date"
              required
              size="lg"
              value={dateRange}
              onChange={setDateRange}
              minDate={dayjs().startOf("day").toDate()}
            />
          </div>
          <div className="relative grid grid-cols-1 gap-px bg-gray-200 md:grid-cols-2">
            {rideOffers.map((rideOffer) => {
              return (
                <Card
                  className="py-8 space-y-6 rounded-none"
                  key={rideOffer.id}
                >
                  <div className="space-y-2">
                    <RideDetails rideOffer={rideOffer} />
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <ActionIcon
                      size="lg"
                      variant="filled"
                      className="w-[50px] h-[50px] bg-primary"
                      onClick={() => {
                        window.open(`tel:${rideOffer.phoneNumber}`);
                      }}
                    >
                      <FaPhone className="text-lg text-white" />
                    </ActionIcon>
                    <Button
                      size="lg"
                      className="bg-primary"
                      leftIcon={<FaWhatsapp className="text-2xl" />}
                      component="a"
                      href={`https://wa.me/${rideOffer.phoneNumber}`}
                      target="_blank"
                    >
                      WhatsApp
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          {fetching && (
            <Card className="flex justify-center w-full py-16 space-y-2 border-t">
              <Loader />
            </Card>
          )}
          {rideOffers.length === 0 &&
            fetching !== undefined &&
            fetching !== true && (
              <div className="flex justify-center w-full px-8 py-8 text-center text-neutral-400">
                <Title order={2}>No carpool available at selected date</Title>
              </div>
            )}
        </div>
      </Layout>
    </div>
  );
};

export default Home;
