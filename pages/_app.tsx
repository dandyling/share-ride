import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider position="top-center">
      <Component {...pageProps} />
    </NotificationsProvider>
  );
}

export default MyApp;
