import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // https://firebase.google.com/docs/reference/js/firebase.User
      if (!user) {
        router.push("/auth");
      }
    });
    return unsubscribe;
  }, [router]);

  if (!auth.currentUser) {
    return null;
  } else {
    return children;
  }
};
