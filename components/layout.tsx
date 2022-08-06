import {
  ActionIcon,
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="lg"
      fixed
      navbar={
        <Navbar className="p-4 sm:w-72" hiddenBreakpoint="lg" hidden={!opened}>
          <Text>Application Navbar</Text>
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
      {children}
    </AppShell>
  );
};
