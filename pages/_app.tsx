import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colors: {
          primary: [
            "#F8F7F2",
            "#ECE5D2",
            "#E5D7B0",
            "#E5CD8C",
            "#ECC863",
            "#D8B655",
            "#C3A44C",
            "#AB9149",
            "#917F4B",
            "#7C6F4A",
          ],
        },
        primaryColor: "primary",
      }}
    >
      <NotificationsProvider position="top-center">
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default MyApp;
