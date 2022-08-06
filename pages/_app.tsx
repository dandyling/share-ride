import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "@mantine/notifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        router.push("/");
      } else {
        router.push("/sign-up-or-login");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <NotificationsProvider position="top-center">
      <Component {...pageProps} />
    </NotificationsProvider>
  );
};

export default MyApp;
