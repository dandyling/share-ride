import { ActionIcon, Card } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { firestore } from "../firebase/firebase";
import { RideDetails, RideOffer } from "./ride-details";

interface RideProfileProps {
  rideOffer: RideOffer;
  onDelete: () => Promise<void>;
}

export const RideProfile = (props: RideProfileProps) => {
  const { rideOffer, onDelete } = props;
  const [deleting, setDeleting] = useState(false);
  return (
    <Card className="py-8 space-y-2 border-t" key={rideOffer.id}>
      <RideDetails rideOffer={rideOffer} />
      <div className="flex justify-end w-full">
        <ActionIcon
          className="mr-2"
          loading={deleting}
          onClick={async () => {
            setDeleting(true);
            try {
              await deleteDoc(doc(firestore, "rideOffers", rideOffer.id));
              await onDelete();
              setDeleting(false);
            } catch (error: any) {
              setDeleting(false);
              showNotification({
                title: "Delete error",
                message: error.message,
                classNames: {
                  root: "before:bg-red-500",
                },
              });
            }
          }}
        >
          <AiFillDelete className="text-2xl text-primary" />
        </ActionIcon>
      </div>
    </Card>
  );
};
