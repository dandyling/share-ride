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
        components: {
          Button: {
            classNames: { root: "focus:bg-accent" },
          },
        },
      }}
    >
      <NotificationsProvider position="top-center">
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default MyApp;
