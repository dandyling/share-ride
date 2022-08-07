import { Card, Loader, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { ProtectedRoute } from "../../components/protected-route";
import { RideOffer } from "../../components/ride-details";
import { RideProfile } from "../../components/ride-profile";
import { auth, firestore } from "../../firebase/firebase";

const MyOfferedRides: NextPage = () => {
  const [rideOffers, setRideOffers] = useState<RideOffer[]>([]);
  const [fetching, setFetching] = useState(false);

  const fetchRideOffers = async (showLoading = true) => {
    if (auth.currentUser) {
      showLoading && setFetching(true);
      try {
        const q = query(
          collection(firestore, "rideOffers"),
          where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const offers = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as RideOffer;
        });
        showLoading && setFetching(false);
        setRideOffers(offers);
      } catch (error: any) {
        showLoading && setFetching(false);
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
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex flex-col items-center w-full">
          <div className="w-full p-4 space-y-2">
            <Title order={1} className="text-lg">
              My Offered Rides
            </Title>
          </div>
          <div className="relative flex flex-col w-full">
            <>
              {rideOffers.map((rideOffer) => (
                <RideProfile
                  key={rideOffer.id}
                  rideOffer={rideOffer}
                  onDelete={() => fetchRideOffers(false)}
                />
              ))}
              {fetching && (
                <Card className="flex justify-center w-full py-16 space-y-2 border-t">
                  <Loader />
                </Card>
              )}
            </>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default MyOfferedRides;
