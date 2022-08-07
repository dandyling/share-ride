import {
  ActionIcon,
  AppShell,
  Footer,
  Header,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import Link from "next/link";
import { ReactNode } from "react";
import { AiOutlineCar, AiOutlineUser } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { loadingAtom } from "../data/loading";
import { auth } from "../firebase/firebase";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [loading] = useAtom(loadingAtom);

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="lg"
      fixed
      classNames={{
        body: "flex w-full justify-center",
        main: "relative max-w-4xl w-full h-full",
      }}
      footer={
        <Footer className="flex justify-center p-4" height={64}>
          <div className="flex items-center justify-around w-full max-w-4xl">
            <Link href="/">
              <ActionIcon>
                <AiOutlineCar className="text-2xl" />
              </ActionIcon>
            </Link>
            <Link href="/offer-ride">
              <ActionIcon>
                <TbSteeringWheel className="text-2xl" />
              </ActionIcon>
            </Link>
            <Link href="/profile">
              <ActionIcon>
                <AiOutlineUser className="text-2xl" />
              </ActionIcon>
            </Link>
          </div>
        </Footer>
      }
      header={
        <Header height={72} className="flex justify-start w-full">
          <Link href="/">
            <div className="flex items-center justify-start h-full max-w-4xl p-4 space-x-3">
              <FaCar className="text-2xl text-ferra" />
              <Text className="mt-1 text-ferra">
                {auth.currentUser
                  ? `Welcome, ${auth.currentUser.displayName}`
                  : "ShareRide - Share your ride with others"}
              </Text>
            </div>
          </Link>
        </Header>
      }
    >
      <LoadingOverlay visible={loading} />
      {children}
    </AppShell>
  );
};
