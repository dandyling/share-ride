import {
  ActionIcon,
  AppShell,
  Burger,
  Footer,
  Header,
  LoadingOverlay,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { auth } from "../firebase/firebase";
import { useAtom } from "jotai";
import { loadingAtom } from "../data/loading";
import { showNotification } from "@mantine/notifications";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useAtom(loadingAtom);
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="lg"
      fixed
      classNames={{ body: "relative" }}
      navbar={
        <Navbar className="sm:w-72" hiddenBreakpoint="lg" hidden={!opened}>
          <Navbar.Section>
            <div
              className="w-full p-4 text-left cursor-pointer text-stone-500"
              onClick={async () => {
                setLoading(true);
                try {
                  await signOut(auth);
                  setLoading(false);
                  setOpened(false);
                } catch (error: any) {
                  setLoading(false);
                  setOpened(false);
                  showNotification({
                    title: "Sign out error",
                    message: error.message,
                    classNames: {
                      root: "before:bg-red-500",
                    },
                  });
                }
              }}
            >
              Logout
            </div>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer className="flex items-center justify-around p-4" height={64}>
          <Link href="/">
            <ActionIcon>
              <FaUser className="text-2xl" />
            </ActionIcon>
          </Link>
          <Link href="/offer-ride">
            <ActionIcon>
              <TbSteeringWheel className="text-2xl" />
            </ActionIcon>
          </Link>
        </Footer>
      }
      header={
        <Header height={72}>
          <div className="flex items-center h-full p-4">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                classNames={{
                  burger: "bg-zinc-500 before:bg-zinc-500 after:bg-zinc-500",
                }}
                mr="xl"
              />
            </MediaQuery>
            <Text>Find a ride through carpool</Text>
          </div>
        </Header>
      }
    >
      <>
        <LoadingOverlay visible={loading} />
        {children}
      </>
    </AppShell>
  );
};
