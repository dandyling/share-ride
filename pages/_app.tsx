import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationsProvider position="top-center">
      <Component {...pageProps} />
    </NotificationsProvider>
  );
};

export default MyApp;
