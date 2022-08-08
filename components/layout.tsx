import { AppShell, Header, LoadingOverlay, Text } from "@mantine/core";
import { useAtom } from "jotai";
import Link from "next/link";
import { ReactNode } from "react";
import { FaCar } from "react-icons/fa";
import { loadingAtom } from "../data/loading";
import { auth } from "../firebase/firebase";
import { TabBar } from "./tabbar";

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
      footer={<TabBar />}
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
