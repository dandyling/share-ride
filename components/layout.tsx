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
import { TbSteeringWheel } from "react-icons/tb";
import { loadingAtom } from "../data/loading";

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
        <Header height={72} className="flex justify-center w-full">
          <div className="flex items-center h-full max-w-4xl p-4">
            <Text>ShareRide</Text>
          </div>
        </Header>
      }
    >
      <LoadingOverlay visible={loading} />
      {children}
    </AppShell>
  );
};
