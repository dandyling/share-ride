import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";

export const useAuthenticationEffect = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        router.push("/");
      } else {
        router.push("/auth");
      }
    });
    return unsubscribe;
  }, [router]);
};
