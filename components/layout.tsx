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
import { ReactNode, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar className="p-4 sm:w-72" hiddenBreakpoint="sm" hidden={!opened}>
          <Text>Application Navbar</Text>
        </Navbar>
      }
      footer={
        <Footer className="flex items-center justify-around p-4" height={64}>
          <ActionIcon>
            <FaUser className="text-2xl" />
          </ActionIcon>
          <ActionIcon>
            <TbSteeringWheel className="text-2xl" />
          </ActionIcon>
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
                color={"#71717a"}
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
